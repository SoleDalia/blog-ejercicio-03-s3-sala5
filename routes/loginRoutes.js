const express = require("express");
const loginRouter = express.Router();
const passport = require("passport");

loginRouter.get("/", (req, res) => {
  res.render("login");
});
loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

//LOGOUT
loginRouter.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = loginRouter;
