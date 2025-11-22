const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// ===========================
// 1) CATEGORY TOTALS (Pie chart)
// ===========================
router.get('/category-totals', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT category, SUM(amount) AS total
       FROM transactions
       WHERE user_id = ?
       AND type = 'expense'
       GROUP BY category`,
      [userId]
    );

    const result = {};
    rows.forEach(r => result[r.category] = parseFloat(r.total));

    res.json(result);
  } catch (err) {
    console.error("Category totals error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===========================
// 2) MONTHLY SUMMARY (Bar chart)
// ===========================
router.get('/monthly-summary', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT DATE_FORMAT(date, '%Y-%m') AS month,
              SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
              SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
       FROM transactions
       WHERE user_id = ?
       GROUP BY month
       ORDER BY month`,
      [userId]
    );

    res.json({
      months: rows.map(r => r.month),
      income: rows.map(r => r.income),
      expense: rows.map(r => r.expense)
    });

  } catch (err) {
    console.error("Monthly summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
