const express = require("express");
var methodOverride = require("method-override");
const adminRouter = express.Router();
const articleController = require("../controllers/articleController");
const dbArticle = require("./../models/index");
const userRoutes = require("./userRoutes");
const isMain = require("../middleware/isMain");

adminRouter.use(methodOverride("_method"));

//Listar artículos en Admin

adminRouter.get("/", articleController.indexAdmin);

//Mostrar página para crear artículo

adminRouter.get("/crear", articleController.create);

//Agregar artículo nuevo

adminRouter.post("/", articleController.store);

//Get del artículo a editar
adminRouter.get("/editar/:id", articleController.edit);

//Edit artículo

adminRouter.patch("/editar/:id", articleController.update);

//Eliminar artículo

adminRouter.delete("/:id", articleController.destroy);

adminRouter.use("/user", isMain, userRoutes);

module.exports = adminRouter;
