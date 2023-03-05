const ModelsSauce = require('../models/ModelsSauce.js');
const fileSystem = require('fs');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller GET pour obtenir le tableau de toutes les sauces
exports.getSauces = (req, res, next) => {
    ModelsSauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }));
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller GET pour obtenir une sauce par son id
exports.getOneSauce = (req, res, next) => {
    ModelsSauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error: error }));
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller POST pour créer une nouvelle sauce
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            } else if (req.file) {
                // S'il y a modification d'image, on supprime l'ancienne image
                const filename = sauce.imageUrl.split('/images/')[1];
                fileSystem.unlink(`images/${filename}`, () => {
                    ModelsSauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message : 'Modifications enregistrées' }))
                    .catch(error => res.status(401).json({ error: error }));
                });
            } else {
                ModelsSauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message : 'Modifications enregistrées' }))
                .catch(error => res.status(401).json({ error: error }));
            }
        })
        .catch(error => res.status(400).json({ error: error }));
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller DELETE pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    ModelsSauce.findOne({ _id: req.params.id})
       .then(sauce => {
           if (sauce.userId != req.auth.userId) {
               res.status(401).json({ message: 'Suppression non autorisée' });
           } else {
               const filename = sauce.imageUrl.split('/images/')[1];
               fileSystem.unlink(`images/${filename}`, () => {
                    ModelsSauce.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({ message: 'Sauce correctement supprimée' })})
                       .catch(error => res.status(401).json({ error: error }));
               });
           }
       })
       .catch(error => res.status(500).json({ error: error }));
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller POST pour like/dislike une sauce avec l'userId
exports.likeSauce = (req, res, next) => {
    ModelsSauce.findOne({ _id: req.params.id})
    .then(sauce => {
        switch (req.body.like) {
            // Si l'utilisateur like la sauce
            case 1 :
                // Si l'utilisateur a déjà liké ou disliké la sauce, erreur ; sinon, on update
                if (sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)) {
                    res.status(403).json({ message: 'Déjà liké/disliké' });
                } else {
                    ModelsSauce.updateOne({ _id: req.params.id }, {
                        $inc: { likes: +1 },
                        $push: { usersLiked: req.body.userId }
                    })
                    .then(() => res.status(200).json({ message : 'Like enregistré' }))
                    .catch(error => res.status(401).json({ error: error }));
                }
            break;
            
            // Si l'utilisateur dislike la sauce
            case -1 :
                // Si l'utilisateur a déjà disliké la sauce, erreur ; sinon, on update
                if (sauce.usersDisliked.includes(req.body.userId) || sauce.usersLiked.includes(req.body.userId)) {
                    res.status(403).json({ message: 'Déjà liké/disliké' });
                } else {
                    ModelsSauce.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: +1 },
                        $push: { usersDisliked: req.body.userId }
                    })
                    .then(() => res.status(200).json({ message : 'Dislike enregistré' }))
                    .catch(error => res.status(401).json({ error: error }));
                }                
            break;

            // Si l'utilisateur enlève son like/dislike
            case 0 :
                // Si l'utilisateur enlève son like, on décrémente like-- et on retire l'userId de usersLiked
                if (sauce.usersLiked.includes(req.body.userId)) {
                    ModelsSauce.updateOne({ _id: req.params.id }, {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    })
                    .then(() => res.status(200).json({ message : 'Like supprimé' }))
                    .catch(error => res.status(401).json({ error: error }));
                };

                // Si l'utilisateur enlève son dislike, on décrémente dislike-- et on retire l'userId de usersDisliked
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    ModelsSauce.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    })
                    .then(() => res.status(200).json({ message : 'Dislike supprimé' }))
                    .catch(error => res.status(401).json({ error: error }));
                };
            break;
        }
    })
    .catch(error => res.status(500).json({ error: error }));
};