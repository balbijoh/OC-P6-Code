const joi = require('joi');

module.exports = (req, res, next) => {
    const Utilisateur = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9&#-_@+*%!]{8,100}$'))
    });

    try {
        let test = Utilisateur.validate({ 
            email: req.body.email, 
            password: req.body.password
        });

        if (test.error) {
            console.log("Erreur de validation Joi-utilisateur : ", test);
            return res.status(400).json({ message: 'Saisie invalide' });
        }
        
        console.log("Validation Joi-utilisateur ok");
        next();
    } catch(error) {
        console.log("Erreur de validation Joi-utilisateur : ", error);
        return res.status(400).json({ message: 'Saisie invalide' });
    }
}