const passwordValidator = require('password-validator');

// Création du schéma pour le mot de passe
const schemaPassword = new passwordValidator();
schemaPassword
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.has().not().symbols(undefined, '=', '\'');

module.exports = (req, res, next) => {
    if (schemaPassword.validate(req.body.password)) {
        next();
    } else {
        console.log('Mot de passe invalide : ' + schemaPassword.validate(req.body.password, { list: true }));
        return res.status(400).json({ message: 'Mot de passe invalide : ' + schemaPassword.validate(req.body.password, { list: true }) });
    }
};