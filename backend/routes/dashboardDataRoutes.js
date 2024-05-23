const express = require('express');
const { getDashboardTable, getDashboardChart } = require('../controllers/dashboardDataController');
const router = express.Router();

router.route('/chart').get(getDashboardChart);
router.route('/table').get(getDashboardTable)

module.exports = router;