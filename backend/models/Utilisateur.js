const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Utilisateur = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

Utilisateur.plugin(uniqueValidator);

module.exports = mongoose.model('Utilisateur', Utilisateur);