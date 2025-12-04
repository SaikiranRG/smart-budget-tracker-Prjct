const express = require("express");
const router = express.Router();
const db = require('../config/db');  
const auth = require("../middleware/auth"); // JWT middleware
const { Parser } = require("json2csv");

router.get("/csv", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute(
      "SELECT type, category, amount, date, description FROM transactions WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "No transactions to export" });
    }

    const fields = ["type", "category", "amount", "date", "description"];
    const json2csv = new Parser({ fields });
    const csvData = json2csv.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions_export.csv");
    return res.send(csvData);

  } catch (err) {
    console.error("CSV Export Error:", err);
    return res.status(500).json({ message: "Failed to export CSV" });
  }
});

module.exports = router;
