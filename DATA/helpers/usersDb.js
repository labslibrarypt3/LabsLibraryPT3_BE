const UserDB = require('../dbConfig');

module.exports = {
    get: function() {
        return UserDB('users');
    },

    add: function() {
        return UserDB('users').insert(user);
    },
}