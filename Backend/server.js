import express from 'express'
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import reportRoutes from './routes/reportRoutes.js'
import exportRoutes from './routes/exportRoutes.js'
import helmet from 'helmet'
import cors from 'cors'
import {connectDB} from './config/db.js'
import { configDotenv } from 'dotenv';
configDotenv()

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet())
app.use(cors({
    origin: ["http://localhost:5173" || "https://expenza-two.vercel.app/"],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))

app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/export', exportRoutes);


app.get('/', (req,res) => {
    res.json({message: "This is Expenza api."})
})

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Expenza API is healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.listen(port,() => {
    console.log("Server is running on 3000");
})