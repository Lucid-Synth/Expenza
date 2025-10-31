import express from 'express'
import {Expenses} from '../models/expenseModel.js'

export const addExpenses = async (req,res) => {
    const {title,amount,category,date,description} = req.body;

    try{
        const expenses = await Expenses.create({
            user: req.user._id,
            title,
            amount,
            category,
            date,
            description
        });

        res.status(200).json(expenses)
    }
    catch(error){
        res.status(201).json({message: "Failed to add expense", error:error.message})
    }
};

export const getExpenses = async (req,res) => {
    try{
        const { month,category } = req.query;

        const filter = { user: req.user._id }

        if(month){
            const start = new Date(`${month}-01`);
            const end = new Date(start)
            end.setMonth(end.getMonth() + 1)
            filter.date = {$gte:start , $lt: end}
        }

        if (category) filter.category = category;

        const expenses = await Expenses.find(filter).sort({ date: -1 });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
    }
};

export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expenses.findOne({ _id: req.params.id, user: req.user._id });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense', error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expenses.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expenses.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
};