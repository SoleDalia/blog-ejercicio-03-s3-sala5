const express = require("express");
const apiRouter = express.Router();
const {
  getAllArticles,
  getOneArticle,
} = require("../controllers/apiController/apiArticleController");

const {
  getAllUsers,
  createUser,
} = require("../controllers/apiController/apiUserController");

apiRouter.get("/articles", getAllArticles);

apiRouter.get("/articles/:id", getOneArticle);

apiRouter.get("/users", getAllUsers);
// apiRouter.get("/users/:id", (req, res) => {});
apiRouter.post("/users", createUser);
apiRouter.patch("/users/:id", (req, res) => {});
apiRouter.delete("/users/:id", (req, res) => {});

apiRouter.get("/comments", (req, res) => {});
apiRouter.get("/comments/:id", (req, res) => {});
apiRouter.post("/comments/:id", (req, res) => {});
apiRouter.patch("/comments/:id", (req, res) => {});
apiRouter.delete("/comments/:id", (req, res) => {});

module.exports = apiRouter;
