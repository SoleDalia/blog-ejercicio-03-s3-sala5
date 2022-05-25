const { Article, User, Comment } = require("../models");
const email = require("../email");
const formidable = require("formidable");
const path = require("path");

// find all
async function index(req, res) {
  const articles = await Article.findAll({
    include: User,
    order: [["createdAt", "DESC"]],
  });
  console.log(articles);
  res.render("home", { articles });
}

// find one
async function showById(req, res) {
  const article = await Article.findOne({
    where: {
      id: req.params.id,
    },
    include: User,
  });

  // trae los comments
  const comments = await Comment.findAll({
    include: User,
    where: {
      articleId: req.params.id,
    },
    order: [["createdAt", "DESC"]],
  });
  if (article === null) {
    return "device not found";
  }
  res.render("article", { article, comments });
}

// cargar pagina Admin
async function indexAdmin(req, res) {
  if (req.user.role.main || req.user.role.editor) {
    const users = await User.findAll();
    const articles = await Article.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
    });
    console.log(req.user.role);
    return res.render("admin", { articles, users, user: req.user });
  }
  const articles = await Article.findAll({
    include: User,
    where: { userId: req.user.id },

    order: [["createdAt", "DESC"]],
  });

  res.render("admin", { articles, users: [], user: req.user });
}

// crear
async function create(req, res) {
  res.render("crear");
}

async function store(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: path.join(__dirname, "../public/img"),
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    const title = fields.title;
    const userId = req.user.id;
    const content = fields.content;
    const image = files.image.newFilename;

    Article.create({
      title,
      content,
      image,
      userId,
    });

    email();
    res.redirect("/admin");

    // const user = await User.findOne({
    //   where: {
    //     lastname: authorLastName,
    //     firstname: authorName,
    //   },
    // });

    // if (user === null) {
    //   await User.create({
    //     firstname: authorName,
    //     lastname: authorLastName,
    //     email: authorEmail,
    //     image,
    //   });
    //   const userJustCreated = await User.findOne({
    //     where: {
    //       lastname: authorLastName,
    //       firstname: authorName,
    //     },
    //   });
    //   await Article.create({
    //     title,
    //     userId: userJustCreated.id,
    //     content,
    //     image,
    //   });
    // } else {
    //   await Article.create({
    //     title,
    //     userId: user.id,
    //     content,
    //   });
    // }
  });
}

async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: User,
  });

  res.render("editar", {
    article,
  });
}

async function update(req, res) {
  console.log("body", req.body);
  const { title, content, image, articleId } = req.body;
  console.log("articleId", articleId);
  const article = await Article.findByPk(articleId);
  console.log(article);
  article.set({
    title,
    content,
    image,
  });

  await article.save();

  res.redirect("/admin");
  // const article = await Article.findByPk(req.params.id, {
  //   include: User,
  // });

  // const user = await User.findOne({
  //   where: {
  //     lastname: authorLastName,
  //     firstname: authorName,
  //   },
  // });

  // if (user === null) {
  //   await User.create({
  //     firstname: authorName,
  //     lastname: authorLastName,
  //     email: authorEmail,
  //   });
  //   const userJustCreated = await User.findOne({
  //     where: {
  //       lastname: authorLastName,
  //       firstname: authorName,
  //     },
  //   });
  //   article.title = req.body.title;
  //   article.content = req.body.content;
  //   article.imagen = req.body.image;
  //   article.userId = userJustCreated.id;
  //   await article.save();
  //   res.redirect("/admin");
  // } else {
  //   article.title = req.body.title;
  //   article.content = req.body.content;
  //   article.imagen = req.body.image;
  //   article.userId = user.id;
  //   article.user.firstname = authorName;
  //   article.user.lastname = authorLastName;
  //   article.user.email = authorEmail;
  //   await user.save();
  //   await article.save();
  //
  // }
}

async function destroy(req, res) {
  const article = await Article.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/admin");
}

async function api(req, res) {
  const articles = await Articles.findAll({
    include: User,

    raw: true,

    order: [["createdAt", "DESC"]],
  });

  res.json(articles);
}

module.exports = {
  index,
  showById,
  create,
  store,
  edit,
  update,
  destroy,
  indexAdmin,
  api,
};
