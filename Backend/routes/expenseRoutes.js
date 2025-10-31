import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';

import {
  addExpenses,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/',protect, addExpenses);
router.get('/',protect,getExpenses);
router.get('/:id', protect, getExpenseById);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);


export default router;