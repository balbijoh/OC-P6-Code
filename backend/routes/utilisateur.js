const express = require('express');
const emailValidator = require('../middleware/email-validator.js');
const passwordValidator = require('../middleware/password-validator.js');
const joiValidation = require('../middleware/joi-utilisateur.js');
const userCtrl = require('../controllers/utilisateur.js');

const router = express.Router();

router.post('/signup', emailValidator, passwordValidator, joiValidation, userCtrl.signup);
router.post('/login', joiValidation, userCtrl.login);

module.exports = router;