const express = require('express');
const router = express.Router();

const _users = require('../models/users');
const _users_dom = require('../views/users');

// Retourner les users depuis le fichier users.json
const getUsers = (req, res, next) => {
    if (req.query.format === 'json') {
        res.send(_users.get());
    } else {
        res.send(_users_dom.renderDt(_users));
    }
};

// Sauvegarder un utilisateur
const saveUser = (req, res, next) => {
    users = _users.add(req.body);
    res.redirect('/users');
};

// Supprimer un utilisateur
const deleteUser = (req, res, next) => {
    users.deleteByName(req.query.name);
    res.redirect('/users');
};

// Retourner le formulaire de création d'un user
const getForm = (req, res, next) => {
        res.send(_users_dom.renderForm());
};

// Define routes
router.get('/add-user', getForm),
router.get('/users', getUsers),
router.post('/users', saveUser),
router.delete('/users', deleteUser)

module.exports = router;