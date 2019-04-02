const registerRouter = require("express").Router();
const knex = require("knex");
const bcrypt = require("bcryptjs");

const userdb = require("../database/dbConfig.js");
const Users = require("../users/users-model");

// WITHOUT HELPER FUNCTIONS
registerRouter.post("/", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 4);
  user.password = hash;
  userdb("users")
    // .where({ username: req.params.username })
    // .first()
    .insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


// WITH HELPER FUNCTIONS

// registerRouter.post("/", (req, res) => {
//   let user = req.body;

//   const hash = bcrypt.hashSync(user.password, 4);
//   user.password = hash;
//   Users.add(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

module.exports = registerRouter;
