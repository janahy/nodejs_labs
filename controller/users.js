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
    let tbody = '';
    users.map( user => {
        tbody += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.profession}</td>
                </tr>`
    })
    res.send(`
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        </head>
        <body>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Age</th>
                        <th>Profession</th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}
                </tbody>
            </table>
        </body>
    `);
};

// Sauvegarder un utilisateur
const saveUser = (req, res, next) => {
    console.log(req.body);
    fs.writeFileSync(_source, JSON.stringify(users.concat(req.body)));
    res.redirect('/users');
};


// Supprimer un utilisateur
const deleteUser = (req, res, next) => {
    console.log(req.body);

    // fs.writeFileSync(_source, JSON.stringify(users.filter(it => it.id)));
    // res.redirect('/users');
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
    saveUser: (PATH, APP) => APP.post(PATH, saveUser),
    deleteUser: (PATH, APP) => APP.delete(PATH, deleteUser)
};