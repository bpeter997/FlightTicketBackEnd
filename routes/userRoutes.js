const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.use(authController.protect);

router.post('/logout', authController.logout);

module.exports = router;
