const Router = require("express").Router();
const Category = require("../controllers/categoryController");

Router.route("/").post(Category.createCategory).get(Category.getAllCategory);
Router.route("/random").get(Category.getRendomCategory);

module.exports = Router;