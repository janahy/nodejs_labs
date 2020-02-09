const _userModel = require('../models/users');
const users_dom = require('../views/users');

class UserController {

    constructor () {
        this.users = new _userModel();
    };
    
    get = (req, res, next) => {
        if (req.query.format === 'json') {
            res.send(this.users.get());
        } else {
            res.send(users_dom.renderDt(this.users));
        }
    };
    
    post = (req, res, next) => {
        this.users = this.users.add(req.body);
        res.redirect('/users');
    };
    
    delete = (req, res, next) => {
        this.users.deleteByName(req.query.name);
        res.redirect('/users');
    };
    
    add = (req, res, next) => {
        res.send(users_dom.renderForm());
    };
};

module.exports = UserController;