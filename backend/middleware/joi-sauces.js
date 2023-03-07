const joi = require('joi');

module.exports = (req, res, next) => {
    const Sauces = joi.object({
        name: joi.string().pattern(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]+$/).min(3).max(50),
        manufacturer: joi.string().pattern(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]+$/).min(3).max(50),
        description: joi.string(),
        mainPepper: joi.string().pattern(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]+$/).max(30),
        heat: joi.number().integer().min(0).max(10),
    })
    
    try {
        let test = Sauces.validate({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
        });

        if (test.error) {
            console.log("Erreur de validation Joi-sauces : ", test);
            return res.status(400).json({ message: 'Saisie invalide' });
        }
        
        console.log("Validation Joi-sauces ok");
        next();
    } catch(error) {
        console.log("Erreur de validation Joi-sauces : ", error);
        return res.status(400).json({ message: 'Saisie invalide' });
    }
}