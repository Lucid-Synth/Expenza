import express from 'express'
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import reportRoutes from './routes/reportRoutes.js'
import {connectDB} from './config/db.js'
import { configDotenv } from 'dotenv';
configDotenv()

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())
connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes)


app.get('/', (req,res) => {
    res.json({message: "This is Expenza api."})
})

app.listen(port,() => {
    console.log("Server is running on 3000");
})