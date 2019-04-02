const session = require('express-session');

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
};