const { Article } = require("../../models");

const getAllArticles = async function (req, res) {
  const articles = await Article.findAll();
  res.json(articles);
};

const getOneArticle = async function (req, res) {
  const article = await Article.findByPk(req.params.id);
  res.json(article);
};

module.exports = { getAllArticles, getOneArticle };
