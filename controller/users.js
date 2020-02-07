// Importer et stocket le module fs dans la constante fs
const fs = require('fs');

// Stocket le chemin relatif du fichier users.json dans la constante _source
const _source = './users.json';
// Lire le contenu du fichier _source en mode synchrone (Non blocking code)
const personsChunk = fs.readFileSync(_source);
// Convertir le buffer retourner par la fonctione readFileSync en json (c'est le format désiré pour cet exercice)
let users = JSON.parse(Buffer.concat([personsChunk]).toString());

// Retourner les users depuis le fichier users.json
const getUsers = (req, res, next) => {
    res.send(JSON.stringify(users));
};

// Sauvegarder un utilisateur
const saveUser = (req, res, next) => {
    console.log(req.body);
    fs.writeFileSync(_source, JSON.stringify(users.concat(req.body)));
    res.redirect('/users');
};


// Supprimer un utilisateur
const saveUser = (req, res, next) => {
    console.log(req.body);
    fs.writeFileSync(_source, JSON.stringify(users.concat(req.body)));
    res.redirect('/users');
};

// Retourner le formulaire de création d'un user
const getForm = (req, res, next) => {
        res.send(`
            <!Doctype html>
            <html>
                <head><h1>Ajouter une personne</h1></head>
                <body>
                    <form action='/users' method='POST'>
                        <input type='text' placeholder='name' name='name'>
                        <input type='text' placeholder='age' name='age'>
                        <input type='text' placeholder='profession' name='profession'>
                        <button type='submit'>Enregistrer</button>
                    </form>
                </body>
            </html>            
        `);
};

// Exporter ce module
module.exports = {
    getForm: (PATH, APP) => APP.get(PATH, getForm),
    getUsers: (PATH, APP) => APP.get(PATH, getUsers),
    saveUser: (PATH, APP) => APP.post(PATH, saveUser)
};