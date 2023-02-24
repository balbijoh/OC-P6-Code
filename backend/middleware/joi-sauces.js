const joi = require('joi');

module.exports = (req, res, next) => {
    const Sauces = joi.object({
        name: joi.string().alphanum().min(3).max(50).required(),
        manufacturer: joi.string().alphanum().min(3).max(50),
        description: joi.string(),
        mainPepper: joi.string().alphanum().max(30),
        heat: joi.number().integer().min(0).max(10),
    })
    
    try {
        Sauces.validate({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
        });
        console.log("Validation Joi-sauces ok");
        next();
    } catch(error) {
        console.log("Erreur de validation Joi-sauces : ", error);
    }
}