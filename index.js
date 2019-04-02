const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require("./routers/users-router");
const loginRouter = require("./routers/login-router");
const registerRouter = require("./routers/register-router");
const sessionConfig = require('./auth/session-config.js');


const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.send(
    `Navigate to /api/login to log in or /api/register to register and /api/users to see users`
  );
});

server.use("/api/users", usersRouter);
server.use("/api/login", loginRouter);
server.use("/api/register", registerRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});
