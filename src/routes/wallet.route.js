const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const auth = require('../middlewares/auth.middleware')

router.post('/add', auth, walletController.addMoney);
router.post('/spend', auth, walletController.spendMoney);
router.get('/transactions', auth, walletController.getTransactions)

module.exports = router