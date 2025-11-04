import { Expenses } from '../models/expenseModel.js';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

export const exportToCSV = async (req, res) => {
  try {
    const expenses = await Expenses.find({ user: req.user._id }).lean();

    if (!expenses.length) {
      return res.status(400).json({ message: 'No expenses found for export.' });
    }

    const fields = ['title', 'amount', 'category', 'date', 'description'];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('expenses.csv');
    res.send(csv);
  } catch (error) {
    console.error('CSV Export Error:', error);
    res.status(500).json({ message: 'Error exporting CSV', error: error.message });
  }
};


export const exportToPDF = async (req, res) => {
  try {
    const expenses = await Expenses.find({ user: req.user._id }).lean();

    if (!expenses.length) {
      return res.status(400).json({ message: 'No expenses found for export.' });
    }

    // Set headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=expenses.pdf');

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);


    const gradient = doc.linearGradient(40, 40, 200, 40)
      .stop(0, '#6366f1')
      .stop(0.5, '#ec4899')
      .stop(1, '#22d3ee');

    doc.fontSize(28)
      .font('Helvetica-BoldOblique')
      .fill(gradient)
      .text('Expenza', 50, 40);

    doc.fontSize(10)
      .fillColor('#555')
      .text(`Generated on: ${new Date().toLocaleDateString()}`, 400, 50, { align: 'right' });

    doc.moveDown(3);

    doc.fontSize(20)
      .fillColor('#111')
      .font('Helvetica-BoldOblique')
      .text('Expense Report', { align: 'center' });

    doc.moveDown(1.5);

    const startX = 50;
    const startY = doc.y;
    const colWidths = {
      no: 40,
      title: 160,
      amount: 80,
      category: 120,
      date: 100,
    };

    const headers = ['No.', 'Title', 'Amount (Rs.)', 'Category', 'Date'];

    // Draw header background
    doc.rect(startX - 5, startY - 3, 520, 22).fill('#f3f4f6').fillColor('#000');
    doc.font('Helvetica-Bold').fontSize(12);

    let x = startX;
    headers.forEach((header, i) => {
      doc.text(header, x, startY, { width: Object.values(colWidths)[i] });
      x += Object.values(colWidths)[i];
    });

    doc.moveTo(startX - 5, startY + 20).lineTo(570, startY + 20).strokeColor('#aaa').stroke();
    doc.moveDown(0.5);

    let y = startY + 25;
    let rowHeight = 25;
    doc.font('Helvetica').fontSize(11).fillColor('#111');

    expenses.forEach((exp, index) => {
      if (y > 720) {
        doc.addPage();
        y = 60;
      }

      // Alternate row background
      if (index % 2 === 0) {
        doc.rect(startX - 5, y - 3, 520, rowHeight).fill('#fafafa').fillColor('#111');
      }

      let xPos = startX;
      doc.text(index + 1, xPos, y, { width: colWidths.no });
      xPos += colWidths.no;

      doc.text(exp.title, xPos, y, { width: colWidths.title });
      xPos += colWidths.title;

      doc.text(`Rs.${exp.amount}`, xPos, y, { width: colWidths.amount, align: 'left' });
      xPos += colWidths.amount;

      doc.text(exp.category, xPos, y, { width: colWidths.category });
      xPos += colWidths.category;

      doc.text(new Date(exp.date).toLocaleDateString(), xPos, y, { width: colWidths.date });

      // Description below row
      if (exp.description) {
        doc.fontSize(9).fillColor('#666')
          .text(exp.description, startX + colWidths.no, y + 14, { width: 400 });
        doc.fontSize(11).fillColor('#111');
        y += 30;
      } else {
        y += rowHeight;
      }
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000')
      .text(`Total Expenses: Rs.${total}`, startX, doc.y, { align: 'right' });

    doc.end();
  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).json({ message: 'Error exporting PDF', error: error.message });
  }
};
