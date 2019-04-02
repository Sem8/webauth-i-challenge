const usersRouter = require("express").Router();
const knex = require("knex");
const bcrypt = require("bcryptjs");

const userdb = require("../database/dbConfig.js");
const Users = require("../users/users-model.js");

// WITHOUT HELPER FUNCTIONS
usersRouter.get('/', restricted,(req, res) => {
    userdb('users').select('id', 'username', 'password')
    .then(users => {
        res.json(users);
    })
    .catch(error => res.send(error));
});

function restricted(req, res, next) {
  try {
    if (req && req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'The server is broken!' });
  }
};

// function restricted(req, res, next) {
//   const { username, password } = req.headers;

//   if (username && password) {
//       userdb('users').where({ username })    
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res
//             .status(401)
//             .json({
//               message: "You shall not pass! your credentials are invalid!"
//             });
//         }
//       })
//       .catch(error => {
//         res
//           .status(500)
//           .json({ message: `Ran into an unexpected error: ${error}` });
//       });
//   } else {
//     res.status(400).json({ message: `You didn't provide all the credentials` });
//   }
// };

//WITH HELPER FUNCTIONS

// usersRouter.get("/", restricted, (req, res) => {
//   // res.send('You can not view the users right now');
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(error => res.send(error));
// });

// function restricted(req, res, next) {
//   const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res
//             .status(401)
//             .json({
//               message: "You shall not pass! your credentials are invalid!"
//             });
//         }
//       })
//       .catch(error => {
//         res
//           .status(500)
//           .json({ message: `Ran into an unexpected error: ${error}` });
//       });
//   } else {
//     res.status(400).json({ message: `You didn't provide all the credentials` });
//   }
// }

module.exports = usersRouter;
