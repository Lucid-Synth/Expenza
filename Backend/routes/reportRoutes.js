import express from 'express'

import {protect} from '../middlewares/authMiddleware.js'
import {getMonthlyReport, getCategoryReport, getCombinedReport} from '../controllers/reportController.js'


const router = express.Router()

router.get('/monthly', protect ,getMonthlyReport)
router.get('/category', protect ,getCategoryReport)
router.get('/overview', protect ,getCombinedReport)


export default router;