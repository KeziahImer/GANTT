const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);

module.exports = router;
