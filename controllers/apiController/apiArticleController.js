const { Article } = require("../../models");
const { Op } = require("sequelize");

const getAllArticles = async function (req, res) {
  let options = {
    order: [["createdAt", "ASC"]],
  };
  if (req.params.text) {
    options.where = { title: { [Op.like]: `%${req.params.text}%` } };
  }

  if (req.params.userId) {
    options.where = { userId: req.params.userId };
  }

  const articles = await Article.findAll(options);
  res.json(articles);
};

const getOneArticle = async function (req, res) {
  const article = await Article.findByPk(req.params.id);
  res.json(article);
};

module.exports = { getAllArticles, getOneArticle };
