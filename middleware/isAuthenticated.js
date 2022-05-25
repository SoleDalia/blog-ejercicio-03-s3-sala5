const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

// const isMain = (req, res, next) => {
//   console.log(req);
//   if (req.user.main) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };

module.exports = isAuthenticated;
