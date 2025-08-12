const Restaurant = require("../models/restaurantModel");
const validateMongo = require("../util/validationMong");

module.exports = {
  addRestaurant: async (req, res) => {
    const { title, time, imgUrl, owner, code, logoUrl, coords } = req.body;

    if (
      !title ||
      !time ||
      !imgUrl ||
      !owner ||
      !code ||
      !logoUrl ||
      !coords ||
      !coords.latitude ||
      !coords.longitude ||
      !coords.address ||
      !coords.title
    )
      return res
        .status(400)
        .json({ status: false, error: `You have a missing field!` });

    const isExist = await Restaurant.findOne({
      title: title,
    });
    if (isExist)
      return res.status(400).json({
        success: false,
        eorro: `Restaurant '${isExist.title}' already exist!`,
      });
    // STR model conversation..
    const newRestaurant = new Restaurant(req.body);
    try {
      await newRestaurant.save();
      res.status(201).json({
        success: true,
        message: `Restaurant successfully created!`,
        data: newRestaurant,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  getRestautrantById: async (req, res) => {
    const id = req.params.restaurant;
    // console.log(validateMongo.isValidId(id));
    // return;
    if (!validateMongo.isValidId(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid entries received!`,
      });
    }
    try {
      const restaurant = await validateMongo.recordFounder(Restaurant, id);
      // console.log(restaurant);
      if (!restaurant[0]) {
        return res.status(404).json({
          success: false,
          error: `Restaurent not found!`,
        });
      }
      res.status(200).json({ success: true, data: restaurant[1] });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  getAllNearByRestaurants: async (req, res) => {
    const code = req.params.code;
    // console.log(code);
    try {
      let nearByRestaurant = [];

      nearByRestaurant = await Restaurant.aggregate([
        { $match: { code: code, isAvialable: true } },
      ]);

      if (nearByRestaurant.length === 0) {
        nearByRestaurant = await Restaurant.aggregate([
          { $match: { isAvialable: true } },
        ]);
      }

      res.status(200).json(nearByRestaurant);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Internal server error!",
      });
    }
  },
  
  // TODO...
  getAllNearByWithoutAvailableRestaurants: async (req, res) => {
    const code = req.params.code;
    // console.log(code);
    try {
      let nearByRestaurant = [];

      nearByRestaurant = await Restaurant.aggregate([
        { $match: { code: code, isAvialable: true } },
      ]);

      if (nearByRestaurant.length === 0) {
        nearByRestaurant = await Restaurant.find().sort({isAvialable:-1});
      }

      res.status(200).json(nearByRestaurant);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Internal server error!",
      });
    }
  },

  getRandomRestaurant: async (req, res) => {
    const code = req.params.code;
    try {
      let randomRestaurant = [];

      randomRestaurant = await Restaurant.aggregate([
        { $match: { code: code, isAvialable: true } },
        { $sample: { size: 5 } },
      ]);

      if (randomRestaurant.length === 0) {
        randomRestaurant = await Restaurant.aggregate([
          { $match: { isAvialable: true } },
          { $sample: { size: 5 } },
        ]);
      }

      res.status(200).json({
        success: true,
        message: `Random`,
        data: randomRestaurant,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },
};
