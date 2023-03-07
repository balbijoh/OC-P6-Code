const express = require('express');
const emailValidator = require('../middleware/email-validator.js');
// const passwordValidator = require('../middleware/password-validator.js');
const joiUtilisateur = require('../middleware/joi-utilisateur.js');
const userCtrl = require('../controllers/utilisateur.js');

const router = express.Router();

router.post('/signup', emailValidator, /*passwordValidator,*/ joiUtilisateur, userCtrl.signup);
router.post('/login', joiUtilisateur, userCtrl.login);

module.exports = router;