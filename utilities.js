const fs = require('fs');

const _sources = {
    _USERS: './data/users.json'
};

module.exports = {
    _rfFileSync: (path) => JSON.parse(Buffer.concat(Array(fs.readFileSync(_sources[path])))),
    _wfFileSync: (path, data) => fs.writeFileSync(_sources[path], JSON.stringify(data))
};