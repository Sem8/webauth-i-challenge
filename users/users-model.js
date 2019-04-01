const userdb = require('../database/dbConfig.js');

module.exports = {
    find, 
    findBy,
    add,
    findById,
};

function find() {
    return userdb('users').select('id', 'username', 'password');
};

function findBy(Columnfilter) {
    return userdb('users').where(Columnfilter);
};

async function add(user) {
    const [id] = await userdb('users').insert(user);

    return findById(id);
};

function findById(id) {
    return userdb('users').where({ id }).first();
};