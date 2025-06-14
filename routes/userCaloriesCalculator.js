const express = require('express');
const router = express.Router();
const userCalculateCalories = require('../controllers/userCalculateCalories');

router.get('/', userCalculateCalories);

module.exports = router;
