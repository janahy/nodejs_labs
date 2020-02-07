// Importation du module express
const express = require('express');
// Importation du module parser
const parser = require('body-parser');
// Init the express app
const app = express();

const routes = require('./routes');

// Middleware pour parser toutes les données du body après chaque http request
app.use(parser.urlencoded());

routes.getForm('/users-form', app);

routes.getUsers('/users', app);

routes.saveUser('/users', app);

// Ecouter sur le port 3000 => Par exemple, si on tape dans l'url http://localhost:3000 cela va décelencher l'envoie des requests à notre appli express
app.listen(3000);