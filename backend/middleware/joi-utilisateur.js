const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = (req, res, next) => {
    const Utilisateur = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required(),
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