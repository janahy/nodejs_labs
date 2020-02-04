// Importer et stocket le module fs dans la constante fs
const fs = require('fs');

// Stocket le chemin relatif du fichier users.json dans la constante _source
const _source = './users.json';
// Lire le contenu du fichier _source en mode synchrone (Non blocking code)
const personsChunk = fs.readFileSync(_source);
// Convertir le buffer retourner par la fonctione readFileSync en json (c'est le format désiré pour cet exercice)
let persons = JSON.parse(Buffer.concat([personsChunk]).toString());
// interpreter la requête et la traiter en fonction des instructions reçues
const routesHandler = (req, res) => {
    switch (req.url) {
        // Récupérer le formulaire de création d'un user
        case '/':
            const _res = getForm();
            _res.end();
            break;
        // Créer et récupérer un utilisateur
        case '/users':
            // Créer un utilisateur si la méthode est de type POST
            if (req.method === 'POST') {
                savePerson(req);
                res.end();
            } 
            // Récupérer les users si la méthode est de type GET
            else if (req.method === 'GET') {
                let _res = getPerson(res);
                _res.end();
            }
            break;
        default:
            // Sinon retourner page non trouvée
            res.write('<h1>Page not found</h1>')
            res.end();
            break;
    };
};

// Retourner les users depuis le fichier users.json
const getPerson = response => {
    response.setHeader('Content-Type', 'json');
    response.write(JSON.stringify(persons));
    return response;
}

// Convertir le buffer retrourné par la fonction readFileSyn et retoruner le résultat dans le format json
const savePerson = req => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });
    req.on('end', () => {
        let newPerson = {};
        Buffer.concat(body).toString().split('&').map( item => {
            let _key = item.split('=')[0];  
            let _val = item.split('=')[1];
            newPerson[_key]=_val;
        });
        persons.push(newPerson);
        fs.writeFileSync(_source, JSON.stringify(persons));
    });
}

// Retourner le formulaire de création d'un user
const getForm = res => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
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
    return res;
}

// Exporter ce module
module.exports = routesHandler;