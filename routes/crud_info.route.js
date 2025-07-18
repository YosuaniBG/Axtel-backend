const express = require('express');
const { saveNormalizedSales, getNormalizedSales, getSalesSummary } = require('../controllers/crud_info.controller');
const router = express.Router();

router.post("/save-sales", saveNormalizedSales);

router.get("/normalized-sales", getNormalizedSales);

router.get("/summary-by-country", getSalesSummary);


module.exports = router;