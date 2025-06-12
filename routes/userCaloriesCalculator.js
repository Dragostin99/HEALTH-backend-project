const express = require('express');
const router = express.Router();
const userCalculateCalories = require('../controllers/userCalculateCalories');

router.post('/', userCalculateCalories);

module.exports = router;
