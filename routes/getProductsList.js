const express = require('express');
const router = express.Router();
const getProductsList = require('../controllers/getProductsList');

router.get('/', getProductsList);

module.exports = router;