const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://balbijoh:V47geur0bmxJR8zY@cluster0.8m5swpi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

//--- Route GET ------------------------------------------------------
// app.use('/api/stuff', (req, res, next) => {
//   const stuff = [
//     {
//     },
//   ];
//   res.status(200).json(stuff);
// });

module.exports = app;