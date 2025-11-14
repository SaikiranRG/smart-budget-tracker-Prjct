const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/summary — total income, expenses, and balance
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.query;

    let query = `
      SELECT 
        SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = ?
    `;
    const params = [userId];

    if (start && end) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(start, end);
    }

    const [rows] = await db.query(query, params);
    const income = rows[0].total_income || 0;
    const expense = rows[0].total_expense || 0;

    res.json({
      total_income: income,
      total_expense: expense,
      balance: income - expense
    });
  } catch (err) {
    console.error('Error in /summary:', err);
    res.status(500).json({ message: 'Error computing summary' });
  }
});

module.exports = router;
