const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const utilisateurRoutes = require('./routes/utilisateur.js');
const saucesRoutes = require('./routes/sauces.js');

mongoose.connect('mongodb+srv://balbijoh:V47geur0bmxJR8zY@cluster0.8m5swpi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB : échec'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', utilisateurRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;