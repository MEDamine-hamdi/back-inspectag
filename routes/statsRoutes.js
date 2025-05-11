const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/monthly-defects-by-user', statsController.monthlyDefectsByUser);
router.get('/defects-sorted', statsController.sortedDefects);
router.get('/defects-by-weekday', statsController.weeklyDayDefects);
router.get('/validation-stats', statsController.validationRatio);

module.exports = router;
