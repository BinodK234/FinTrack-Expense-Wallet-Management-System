const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const reportController = require('../controllers/report.controller');


router.get('/monthly', auth, reportController.getMonthlySummary)
router.get('/cashflow', auth, reportController.getCashflow);
router.get('/categories', auth, reportController.getCategoryReport);

module.exports = router;