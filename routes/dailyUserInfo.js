const express = require('express');
const router = express.Router();
const {
  addProduct,
  deleteProduct,
  getDayInfo,
} = require('../controllers/daily-user');

router.post('/', addProduct);
router.delete('/:productId', deleteProduct);
router.post('/day-info', getDayInfo);

module.exports = router;
