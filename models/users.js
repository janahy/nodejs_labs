const _source = '_USERS';

const _utils = require('../utilities');

let users = [];

module.exports = {
    get: () => {
        console.log(_utils._rfFileSync(_source));
        users = _utils._rfFileSync(_source).length > users.length ? _utils._rfFileSync(_source) : users;
        return users;
    },
    add: (_user) => {
        users = users.concat(_user);
        _utils._wfFileSync(_source, users);
    },
    deleteByName: (_name) => {
        users = users.filter(user => user.name !== _name.name);
        _utils._wfFileSync(_source, users);
    }
};