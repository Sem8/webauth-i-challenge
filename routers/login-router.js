const loginRouter = require("express").Router();
const knex = require("knex");
const bcrypt = require("bcryptjs");

const userdb = require("../database/dbConfig.js");
const Users = require("../users/users-model.js");

loginRouter.post("/", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res
          .status(200)
          .json({ message: `Welcome ${user.username} you're logged in.` });
      } else {
        res
          .status(401)
          .json({
            message: "You shall not pass, your credentials are invalid"
          });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

  // res.send('Please log in');
});

// loginRouter.post('/', (req, res) => {
//     let { username, password } = req.body;
//     users('users')
//       .where({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           res.status(200).json({ message: `Hello ${user.username}` });
//         } else {
//           res
//             .status(401)
//             .json({ message: 'Sorry, we could not find you in our systems' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   });

module.exports = loginRouter;
