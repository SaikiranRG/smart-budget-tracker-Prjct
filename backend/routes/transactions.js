const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');
const router = express.Router();
const verifyToken = require('../middleware/auth');


/// POST /api/transactions - Add new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;
    const userId = req.user.id; // from JWT

    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: 'All fields required' });
    }

    await db.query(
      'INSERT INTO transactions (user_id, type, category, amount, date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, type, category, amount, date, description]
    );

    res.status(201).json({ message: 'Transaction added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a transaction
router.put('/:id', auth, (req, res) => {
  const { id } = req.params;
  const { type, category, amount, description, date } = req.body;
  const userId = req.userId;

  const query = `
    UPDATE transactions
    SET type=?, category=?, amount=?, description=?, date=?
    WHERE id=? AND user_id=?
  `;

  db.query(query, [type, category, amount, description, date, id, userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating transaction' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction updated successfully' });
  });
});

// Delete transaction (soft delete optional)
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const query = `DELETE FROM transactions WHERE id=? AND user_id=?`;
  db.query(query, [id, userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting transaction' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  });
});

// Get all transactions for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    const [rows] = await db.query(
      'SELECT id, type, category, amount, date, description FROM transactions WHERE user_id = ? ORDER BY date DESC',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(200).json({ message: 'No transactions found', transactions: [] });
    }

    res.status(200).json({ transactions: rows });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single transaction by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT id, type, category, amount, date, description FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
