const express = require('express');
const router = express.Router();
const { register, login, logout, refreshUser } = require('../controllers/auth');
const auth = require('../middleware/authentication');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/current', auth, refreshUser);

module.exports = router;
