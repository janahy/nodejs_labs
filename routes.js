const fs = require('fs');

const _source = './users.json';
const personsChunk = fs.readFileSync(_source);
let persons = JSON.parse(Buffer.concat([personsChunk]).toString());

const routesHandler = (req, res) => {
    switch (req.url) {
        case '/':
            const _res = getForm();
            _res.end();
            break;
        case '/users':
            if (req.method === 'POST') {
                savePerson(req);
                res.end();
            } else if (req.method === 'GET') {
                let _res = getPerson(res);
                _res.end();
            }
            break;
        default:
            res.write('<h1>Page not found</h1>')
            res.end();
            break;
    };
};

const getPerson = response => {
    response.setHeader('Content-Type', 'json');
    response.write(JSON.stringify(persons));
    return response;
}

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

module.exports = routesHandler;