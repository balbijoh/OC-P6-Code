const email = require('email-validator');

module.exports = (req, res, next) => {
    if (email.validate(req.body.email)) {        
        console.log('Adresse mail valide');
        next();
    } else {
        console.log('Adresse mail invalide');
        return res.status(400).json({ message: 'Adresse mail invalide' });
    }
};