import { Expenses } from '../models/expenseModel.js'
import { Parser } from 'json2csv'
import PDFDocument from 'pdfkit'
import path from 'path'
import fs, { fstat } from 'fs'


export const exportToCSV = async (req,res) => {
    try{
        const expenses = await Expenses.find({user: req.user._id}).lean();

        if(!expenses.length){
            return res.status(400).json({message: "No Expenses found in export"});
        }
        const fields = ['title','amount','category','date', 'description']
        const parser = new Parser({fields})
        const csv = parser.parse(expenses)

        res.header('Content-type','text/csv');
        res.attachment('expenses.csv')
        res.send(csv)
    }
    catch(error){
        res.status(500).json({message: "Error exporting CSV", error: error.message})
    }
};


export const exportToPDF = async (req,res) => {
    try{
        const expenses = await Expenses.find({user: req.user._id}).lean();

        if(!expenses.length){
            return res.status(400).json({message: "No Expenses found in export"});
        }
        const doc = new PDFDocument();

        doc.pipe(res);

        doc.fontSize(20).text('Expense Report', {align: 'center'});
        doc.moveDown()

            expenses.forEach(exp => {
        doc
            .fontSize(12)
            .text(`Title: ${exp.title}`)
            .text(`Amount: ${exp.amount}`)
            .text(`Category: ${exp.category}`)
            .text(`Date: ${new Date(exp.date).toDateString()}`)
            .text(`Description: ${exp.description || '-'}`)
            .moveDown();
        });

        doc.end();

        }catch (error) {
            res.status(500).json({ message: 'Error exporting PDF', error: error.message });
        }
        };
        