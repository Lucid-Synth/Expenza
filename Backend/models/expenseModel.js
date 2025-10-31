import mongoose from  'mongoose'

const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: ['Food','Travel','Shopping','Bills','Entertainment','Others'],
        default:'Others'
    },
    date:{
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: false
    }
},
    {timestamps:true}
)

export const Expenses = mongoose.model('Expenses',expenseSchema,'Expenses')