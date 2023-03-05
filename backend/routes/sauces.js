const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');
const joiSauces = require('../middleware/joi-sauces.js');
const saucesCtrl = require('../controllers/sauces.js');

router.get('/', auth, saucesCtrl.getSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/', auth, multer, joiSauces, saucesCtrl.createSauce);
router.put('/:id', auth, multer, joiSauces, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;