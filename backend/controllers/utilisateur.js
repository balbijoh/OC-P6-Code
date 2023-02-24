const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur.js');

// Controller POST pour créer un compte utilisateur
exports.signup = (req, res, next) => {
    // On hash le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const utilisateur = new Utilisateur({
            email: req.body.email,
            password: hash,
        });
        
        utilisateur.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Controller POST pour se connecter à un compte existant
exports.login = (req, res, next) => {
    Utilisateur.findOne({ email: req.body.email })
    .then(utilisateur => {
        if (utilisateur === null) {
            res.status(401).json({ message: 'Utilisateur introuvable' });
        } else {
            bcrypt.compare(req.body.password, utilisateur.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Mot de passe incorrect' });
                } else {
                    res.status(200).json({ 
                        userId: utilisateur._id,
                        token: jwtoken.sign(
                            { userId: utilisateur._id },
                            process.env.AUTHORIZATION_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                };
            })
            .catch(error => res.status(500).json({ error }));
        };
    })
    .catch(error => res.status(500).json({ error }));
};