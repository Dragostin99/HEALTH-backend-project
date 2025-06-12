const express = require('express');
const router = express.Router();
const calculateCalories = require('../controllers/publicCaloriesCalculator');

router.post('/', calculateCalories);

module.exports = router;
