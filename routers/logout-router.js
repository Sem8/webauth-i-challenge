const logoutRouter = require("express").Router();

logoutRouter.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: `You can't get out: ${err}` });
      } else {
        res.status(200).json({ message: "bye, thanks for visiting" });
      }
    });
  } else {
    res.status(200).json({ message: "bye, thanks for visiting" });
  }
});

module.exports = logoutRouter;
