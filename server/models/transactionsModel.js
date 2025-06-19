import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ['manual', 'mpesa_stk', 'mpesa_b2c', 'imported'],
      default: 'manual',
    },
    description: {
      type: String,
    },
    mpesa_transaction_id: {
      type: String,
    },
    transaction_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
