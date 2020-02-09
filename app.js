const parser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

const users = require('./routes');
const homeView = require('./views/home');

app.use(parser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.get('/', (req, res, next) => {
    res.send(homeView.render(`<h1>Bienvenu dans ce LAB Nodejs ayant pour objectif l'exploration de toutes les fonctionnalités de cette techno</h1>`));
});

app.use( (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
} );

app.listen(3000);