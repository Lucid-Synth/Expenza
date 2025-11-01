import {Expenses} from '../models/expenseModel.js'

export const getMonthlyReport = async (req,res) => {
    try{
        const reports = await Expenses.aggregate([
            {$match: {user: req.user._id}},
            {
                $group:{
                    _id: {$month: '$date'},
                    total: {$sum: '$amount'},
                }
            },
            {$sort: {'_id': 1}},
        ])

        const months = [
            '','January','February','March','April','May','June','July','August','September','October','November','December'
        ];

        const formatted = reports.map(r => ({
            month: months[r._id],
            total: r.total
        }));

        res.json(formatted)
    }
    catch(error){
        res.staxtus(500).json({message:'Error generating monthly report', error:error.message})
    }
};

export const getCategoryReport = async (req,res) => {
    try{
        const reports = await Expenses.aggregate([
            {$match: {user: req.user._id}},
            {
                $group:{
                    _id: '$category',
                    total:{$sum: '$amount'}
                }
            },
            {$sort: {total: -1}}
        ])

        const formatted = reports.map(r => ({
            category: r._id,
            total: r.total
        }))

        res.json(formatted)
    }
    catch(error){
        res.status(500).json({message: 'Error getting category report', error:error.message})
    }
}

export const getCombinedReport = async (req,res) => {
    try {
    const [monthly, category] = await Promise.all([
      Expenses.aggregate([
        { $match: { user: req.user._id } },
        {
          $group: {
            _id: { $month: '$date' },
            total: { $sum: '$amount' },
          },
        },
        { $sort: { '_id': 1 } },
      ]),
      Expenses.aggregate([
        { $match: { user: req.user._id } },
        {
          $group: {
            _id: '$category',
            total: { $sum: '$amount' },
          },
        },
      ]),
    ]);

    const months = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedMonthly = monthly.map(r => ({
      month: months[r._id],
      total: r.total,
    }));

    const formattedCategory = category.map(r => ({
      category: r._id,
      total: r.total,
    }));

    res.json({
      monthly: formattedMonthly,
      category: formattedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating overview', error: error.message });
  }
};