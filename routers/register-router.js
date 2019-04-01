const registerRouter = require("express").Router();
const knex = require("knex");
const bcrypt = require("bcryptjs");

const userdb = require("../database/dbConfig.js");
const Users = require("../users/users-model");

// registerRouter.get('/', (req, res) => {
//     res.send('Please register');
// });

registerRouter.post("/", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 4);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.statusCode(500).json(error);
    });
});

module.exports = registerRouter;
