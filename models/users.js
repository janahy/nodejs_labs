const _source = '_USERS';

const _utils = require('../utilities');

class UserModel {

    constructor() {
        this.users = _utils._rfFileSync(_source);
    }
    
    get = () => this.users;

    add = (_user) => _utils._wfFileSync(_source, this.users.concat(_user));

    deleteByName (_name) {
        this.users = this.users.filter(user => user.name !== _name);
        _utils._wfFileSync(_source, this.users);
    };
}

module.exports = UserModel;