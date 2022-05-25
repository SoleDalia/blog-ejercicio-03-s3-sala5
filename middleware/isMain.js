const isMain = (req, res, next) => {
  console.log(req);
  if (req.user.main) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = isMain;
