// Importation du module express
const userController = require('../controller/users');

module.exports = (app) => {
    userController.getForm('/add', app);
    userController.getUsers('/users', app);
    userController.saveUser('/users', app);
};