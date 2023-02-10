const multer = require('multer');

// Dictionnaire des extensions gérées
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    // Dossier cible : images/
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        // Formatage du nom de l'image
        const name = file.originalname.split(' ').join('_').split('.')[0];
        // Récupération de l'extension de fichier
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');