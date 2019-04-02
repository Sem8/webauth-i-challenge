const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const configuredKnex = require('../database/dbConfig.js');

module.exports = {
    name: 'entemanns',
    secret: 'No sense',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: configuredKnex,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    }),
};