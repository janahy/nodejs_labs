// Importation du module parser
const parser = require('body-parser');
// Importation du module express
const express = require('express');
// Init the express app
const app = express();
// Middleware init
app.use(parser.urlencoded({extended: false}));
// Importer et initier le UserController
const users = require('./routes/users');
app.use(users);
app.use( (req, res, next) => {
    res.status(404).send(`<h1>Oooops L'url "${req.url}" n'a pas été trouvée !`);
} );
// Ecouter sur le port 3000 => Par exemple, si on tape dans l'url http://localhost:3000 cela va décelencher l'envoie des requests à notre appli express
app.listen(3000);