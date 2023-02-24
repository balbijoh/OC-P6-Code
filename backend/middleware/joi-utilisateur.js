const joi = require('joi');

module.exports = (req, res, next) => {
    const Utilisateur = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9&#-_@+*%!]{8,100}$'))
    })
    .xor('email', 'password');
      
    try {
        Utilisateur.validate({ 
            email: req.body.email, 
            password: req.body.password
        });
        
        console.log("Validation Joi-utilisateur ok");
        next();
    } catch(error) {
        console.log("Erreur de validation Joi-utilisateur : ", error);
    }
}