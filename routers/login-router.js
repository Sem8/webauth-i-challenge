const loginRouter = require('express').Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');

loginRouter.get('/', (req, res) => {
    res.send('Please log in');
});

module.exports = loginRouter;