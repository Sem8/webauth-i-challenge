const usersRouter = require('express').Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');

const userdb = require('../database/dbConfig.js');
const Users = require('../users/users-model.js');


usersRouter.get('/', (req, res) => {
    // res.send('You can not view the users right now');
    Users.find().then(users => {
        res.json(users);
    })
    .catch(error => res.send(error));
});


module.exports = usersRouter;