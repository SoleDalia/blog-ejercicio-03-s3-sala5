const express = require("express");
const router = express.Router();
const { update, destroy } = require("../controllers/userController");

router.get("/:id", function (req, res) {
  res.render("editaruser");
});
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
