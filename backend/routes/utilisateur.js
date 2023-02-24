const express = require('express');

const emailValidator = require('../middleware/email-validator.js');
const passwordValidator = require('../middleware/password-validator.js');
const userCtrl = require('../controllers/utilisateur.js');

const router = express.Router();

router.post('/signup', emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;