import express from 'express'
import { exportToCSV,exportToPDF } from '../controllers/exportController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/csv',protect, exportToCSV);
router.get('/pdf',protect, exportToPDF);

export default router