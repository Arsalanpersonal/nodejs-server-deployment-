const Router = require("express").Router();
const Food = require("../controllers/foodController.js");

Router.route("/").post(Food.addFood);
Router.route("/:id").get(Food.getFoodById);
Router.route("/search/:keyword").get(Food.searchFoods);
Router.route("/recommendation/:code").get(Food.getRandomFoods);
Router.route("/restaurant/:restaurant").get(Food.getFoodsByRestaurant);
Router.route("/:category/:code").get(Food.getFoodsByCategoryAndCode);
Router.route("/random/:category/:code").get(Food.getRandomFoodsByCategoryAndCode);

module.exports = Router;
