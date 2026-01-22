<<<<<<< Updated upstream
=======
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const auth = require('../middlewares/auth.middleware')
/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet management APIs
 */


/**
 * @swagger
 * /wallet/add:
 *   post:
 *     summary: Add money to wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               note:
 *                 type: string
 *                 example: Salary credit
 *     responses:
 *       200:
 *         description: Money added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/add', auth, walletController.addMoney);
/**
 * @swagger
 * /wallet/spend:
 *   post:
 *     summary: Spend money from wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 250
 *               category:
 *                 type: string
 *                 example: Food
 *               note:
 *                 type: string
 *                 example: Lunch payment
 *     responses:
 *       200:
 *         description: Money spent successfully
 *       400:
 *         description: Insufficient balance
 *       401:
 *         description: Unauthorized
 */
router.post('/spend', auth, walletController.spendMoney);

/**
 * @swagger
 * /wallet/transactions:
 *   get:
 *     summary: Get logged-in user's transactions
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           example: 2026-01-01
 *         description: From date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           example: 2026-01-31
 *         description: To date
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/transactions', auth, walletController.getTransactions)


/**
 * @swagger
 * /wallet/summary:
 *   get:
 *     summary: Get wallet summary
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet summary fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/summary', auth, walletController.getSummary)

module.exports = router
>>>>>>> Stashed changes
