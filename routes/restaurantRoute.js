const Router = require("express").Router();
const Restaurant = require("../controllers/restaurantController");

Router.route("/").post(Restaurant.addRestaurant);
Router.route("/:restaurant").get(Restaurant.getRestautrantById);
Router.route("/nearby/:code").get(Restaurant.getAllNearByRestaurants);
Router.route("/nearby_crossing/:code").get(Restaurant.getAllNearByWithoutAvailableRestaurants);
Router.route("/all/:code").get(Restaurant.getRandomRestaurant);

module.exports = Router;
