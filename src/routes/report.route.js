const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const reportController = require('../controllers/report.controller');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Report and analytics APIs
 */
 
/**
 * @swagger
 * /reports/monthly:
 *   get:
 *     summary: Get monthly transaction summary
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: number
 *           example: 1
 *         description: Month number (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *           example: 2026
 *         description: Year
 *     responses:
 *       200:
 *         description: Monthly report fetched successfully
 *       401:
 *         description: Unauthorized
 */

router.get('/monthly', auth, reportController.getMonthlySummary)

/**
 * @swagger
 * /reports/cashflow:
 *   get:
 *     summary: Get cashflow report (credit vs debit)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cashflow report fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/cashflow', auth, reportController.getCashflow);

/**
 * @swagger
 * /reports/categories:
 *   get:
 *     summary: Get category-wise expense report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category report fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/categories', auth, reportController.getCategoryReport);

module.exports = router;