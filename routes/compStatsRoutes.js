const express = require('express');
const router = express.Router();
const compStatsController = require('../controllers/compStatsController');

router.get('/avg-similarity-agent', compStatsController.avgSimilarityPerAgent);
router.get('/validation-ratio', compStatsController.validationRatio);
router.get('/monthly-orders', compStatsController.monthlyOrders);
router.get('/avg-similarity-time', compStatsController.avgSimilarityOverTime);
router.get('/similarity-distribution', compStatsController.similarityDistribution);
router.get('/top-companies-orders', compStatsController.topCompaniesByOrders);
router.get('/avg-similarity-company', compStatsController.avgSimilarityPerCompany);
router.get('/frequent-label-crops', compStatsController.mostFrequentLabelCrop);

module.exports = router;
