// Importer le module http et le stocket dans la variable constante http
const http = require('http');
// Importation du module local routes permettant de naviguer les routes et traiter les requests 
const routes = require('./routes');

// Créer un serveur node.js
const server = http.createServer(routes);

// Démarre le process node.js sur le port 3000 et écouter sur les reqûtes en provenance de cette adresse (http://localhost:3000)
server.listen(3000);