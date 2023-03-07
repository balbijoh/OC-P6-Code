const email = require('email-validator');

module.exports = (req, res, next) => {
    if (email.validate(req.body.email)) {        
        console.log('email-validator ok');
        next();
    } else {
        console.log('email-validator erreur');
        return res.status(400).json({ message: 'Adresse mail invalide' });
    }
};