const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const loginRoutes = require("./loginRoutes");
const registerRoutes = require("./registerRoutes");
const isAuthenticated = require("../middleware/isAuthenticated");
const apiRoutes = require("./apiRoutes");

module.exports = (app) => {
  app.use("/", publicRoutes);
  app.use("/admin", isAuthenticated, adminRoutes);
  app.use("/login", loginRoutes);
  app.use("/register", registerRoutes);
  app.use("/api", apiRoutes);
};
