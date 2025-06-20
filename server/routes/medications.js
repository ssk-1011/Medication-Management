import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/init.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Get all medications for user
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  db.all(
    'SELECT * FROM medications WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json(rows);
    }
  );
});

// Add new medication
router.post('/', authenticateToken, (req, res) => {
  const { name, dosage, frequency, times, notes } = req.body;
  const userId = req.user.userId;

  if (!name || !dosage || !frequency) {
    return res.status(400).json({ message: 'Name, dosage, and frequency are required' });
  }

  db.run(
    'INSERT INTO medications (user_id, name, dosage, frequency, times, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, name, dosage, frequency, times || 1, notes || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error adding medication' });
      }

      res.status(201).json({
        id: this.lastID,
        user_id: userId,
        name,
        dosage,
        frequency,
        times: times || 1,
        notes: notes || ''
      });
    }
  );
});

// Update medication
router.put('/:id', authenticateToken, (req, res) => {
  const { name, dosage, frequency, times, notes } = req.body;
  const medicationId = req.params.id;
  const userId = req.user.userId;

  if (!name || !dosage || !frequency) {
    return res.status(400).json({ message: 'Name, dosage, and frequency are required' });
  }

  db.run(
    'UPDATE medications SET name = ?, dosage = ?, frequency = ?, times = ?, notes = ? WHERE id = ? AND user_id = ?',
    [name, dosage, frequency, times || 1, notes || '', medicationId, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating medication' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Medication not found' });
      }

      res.json({ message: 'Medication updated successfully' });
    }
  );
});

// Delete medication
router.delete('/:id', authenticateToken, (req, res) => {
  const medicationId = req.params.id;
  const userId = req.user.userId;

  db.run(
    'DELETE FROM medications WHERE id = ? AND user_id = ?',
    [medicationId, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error deleting medication' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Medication not found' });
      }

      res.json({ message: 'Medication deleted successfully' });
    }
  );
});

// Mark medication as taken
router.post('/:id/taken', authenticateToken, (req, res) => {
  const { date } = req.body;
  const medicationId = req.params.id;
  const userId = req.user.userId;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  // First check if medication exists and belongs to user
  db.get(
    'SELECT id FROM medications WHERE id = ? AND user_id = ?',
    [medicationId, userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (!row) {
        return res.status(404).json({ message: 'Medication not found' });
      }

      // Insert log entry
      db.run(
        'INSERT INTO medication_logs (medication_id, user_id, taken_at) VALUES (?, ?, ?)',
        [medicationId, userId, date],
        function(err) {
          if (err) {
            return res.status(500).json({ message: 'Error logging medication' });
          }

          res.json({ 
            message: 'Medication marked as taken',
            logId: this.lastID
          });
        }
      );
    }
  );
});

// Get adherence statistics
router.get('/adherence', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  // Get basic stats - in a real app, this would be more sophisticated
  db.all(
    `SELECT 
       COUNT(DISTINCT m.id) as total_medications,
       COUNT(ml.id) as total_taken
     FROM medications m
     LEFT JOIN medication_logs ml ON m.id = ml.medication_id AND DATE(ml.taken_at) = DATE('now')
     WHERE m.user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      const stats = rows[0] || { total_medications: 0, total_taken: 0 };
      const adherenceRate = stats.total_medications > 0 
        ? Math.round((stats.total_taken / stats.total_medications) * 100)
        : 0;

      res.json({
        overall: adherenceRate,
        taken: stats.total_taken,
        total: stats.total_medications
      });
    }
  );
});

export default router;