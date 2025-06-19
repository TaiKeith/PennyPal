import Transaction from '../models/transactionsModel.js';
import mongoose from 'mongoose';

export const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, method, description, mpesa_transaction_id, transaction_date } = req.body;

    const transaction = Transaction.create({
      user_id: req.user._id,
      amount,
      type,
      category,
      method,
      description,
      mpesa_transaction_id: mpesa_transaction_id || null,
      transaction_date: transaction_date || new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { month, year, type, category } = req.query;
    const filters = { user_id: req.user._id };

    if (type) filters.type = type;
    if (category) filters.category = category;

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filters.transaction_date = { $gte: start, $lte: end };
    }

    const transactions = await Transaction.find(filters).sort({ transaction_date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $group: {
          _id: {
            month: { $month: '$transaction_date' },
            year: { $year: '$transaction_date' }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
