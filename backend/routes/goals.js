const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/goals
 * body: { target_amount, target_date }
 * Creates or updates the user's single active goal.
 */
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { target_amount, target_date } = req.body;

    if (!target_amount || !target_date) {
      return res.status(400).json({ message: 'Target amount and date are required' });
    }

    // Upsert: if user already has a goal, update it
    const [existing] = await db.query(
      'SELECT id FROM goals WHERE user_id = ?',
      [userId]
    );

    if (existing.length) {
      await db.query(
        'UPDATE goals SET target_amount = ?, target_date = ? WHERE user_id = ?',
        [target_amount, target_date, userId]
      );
    } else {
      await db.query(
        'INSERT INTO goals (user_id, target_amount, target_date) VALUES (?, ?, ?)',
        [userId, target_amount, target_date]
      );
    }

    res.status(200).json({ message: 'Goal saved successfully' });
  } catch (err) {
    console.error('Error saving goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/goals
 * Returns goal + progress
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [[goalRows], [summaryRows]] = await Promise.all([
      db.query('SELECT target_amount, target_date FROM goals WHERE user_id = ?', [userId]),
      db.query(`
        SELECT 
          SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
          SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
        FROM transactions
        WHERE user_id = ?
      `, [userId])
    ]);

    if (!goalRows.length) {
      return res.status(200).json({ hasGoal: false });
    }

    const goal = goalRows[0];
    const income = summaryRows[0].total_income || 0;
    const expense = summaryRows[0].total_expense || 0;
    const currentSaved = income - expense;

    const targetAmount = Number(goal.target_amount);
    const today = new Date();
    const targetDate = new Date(goal.target_date);

    // months left
    let monthsLeft = (targetDate.getFullYear() - today.getFullYear()) * 12 +
                     (targetDate.getMonth() - today.getMonth());
    if (monthsLeft < 1) monthsLeft = 1;

    const remaining = Math.max(0, targetAmount - currentSaved);
    const monthlyNeeded = monthsLeft > 0 ? remaining / monthsLeft : remaining;
    const percent = targetAmount > 0 ? Math.min(100, (currentSaved / targetAmount) * 100) : 0;

    res.json({
      hasGoal: true,
      target_amount: targetAmount.toFixed(2),
      target_date: goal.target_date,
      current_saved: currentSaved.toFixed(2),
      monthly_needed: monthlyNeeded.toFixed(2),
      months_left: monthsLeft,
      percent: percent.toFixed(1)
    });

  } catch (err) {
    console.error('Error loading goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
