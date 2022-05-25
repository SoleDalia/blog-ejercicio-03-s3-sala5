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

// articles routes
apiRouter.get("/articles", getAllArticles); //trae todos los articulos
apiRouter.get("/articles/:text", getAllArticles); //trae articulos por palabras claves
apiRouter.get("/articles/find/:userId", getAllArticles); //trae articulos por usuario
apiRouter.get("/articles/:id", getOneArticle); //trae por usuario

// user routes
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
