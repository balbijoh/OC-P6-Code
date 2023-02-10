const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');
const saucesCtrl = require('../controllers/sauces.js');


router.get('/', auth, saucesCtrl.getSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
// router.post('/:id/like', auth, saucesCtrl.sauces);

module.exports = router;