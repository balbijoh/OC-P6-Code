const ModelsSauce = require('../models/ModelsSauce.js');


// Controller POST pour enregistrer une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    // On supprime l'id auto-généré
    delete sauceObject._id;

    const newSauce = new ModelsSauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });

    newSauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée' }))
    .catch(error => res.status(400).json({ error: error }));
};


// Controller GET pour obtenir une sauce par son id
exports.getOneSauce = (req, res, next) => {
    ModelsSauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error: error }));
};


// Controller PUT pour modifier une sauce existante
exports.modifySauce = (req, res, next) => {
    // S'il y a une modification d'image => req.body.sauce
    // S'il n'y a pas de modification d'image => ...req.body
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    // On supprime l'id automatiquement généré
    delete sauceObject._userId;

    ModelsSauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Modification non autorisée'});
            } else {
                ModelsSauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message : 'Modifications enregistrées' }))
                .catch(error => res.status(401).json({ error: error }));
            }
        })
        .catch(error => res.status(400).json({ error: error }));
};


// Controller DELETE pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    ModelsSauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
    .catch(error => res.status(400).json({ error: error }));
};


// Controller POST pour like/dislike une sauce avec l'userId



// Controller GET pour obtenir le tableau de toutes les sauces
exports.getSauces = (req, res, next) => {
    ModelsSauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }));
};