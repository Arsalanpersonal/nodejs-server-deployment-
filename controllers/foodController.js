const Food = require("../models/foodModel");
const validateMongo = require("../util/validationMong");
module.exports = {
  addFood: async (req, res) => {
    const {
      title,
      time,
      foodTags,
      category,
      foodType,
      code,
      restaurant,
      desc,
      price,
      additives,
      imgUrl,
    } = req.body;

    if (
      !title ||
      !time ||
      !foodTags ||
      !category ||
      !foodType ||
      !code ||
      !restaurant ||
      !desc ||
      !price ||
      !additives ||
      !imgUrl
    )
      return res
        .status(400)
        .json({ status: false, error: `You have a missing field!` });

    req.body.title = req.body.title.toString().toLowerCase().trim();
    const isExist = await Food.findOne({ title: req.body.title });

    if (isExist) {
      return res.status(400).json({
        status: false,
        error: `Food '${isExist.title}' already exists!`,
      });
    }

    const newFood = new Food(req.body);
    // console.log(req.body);
    // STR model conversation...
    try {
      await newFood.save();
      res.status(201).json({
        success: true,
        message: `Food ${newFood.title} added!`,
        data: newFood,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  getFoodById: async (req, res) => {
    const id = req.params.id;

    if (!validateMongo.isValidId(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid entries received!`,
      });
    }

    try {
      const food = await validateMongo.recordFounder(Food, id);
      // console.log(restaurant);
      if (!food[0]) {
        return res.status(404).json({
          success: false,
          error: `Food not found!`,
        });
      }
      res.status(200).json({ success: true, data: food[1] });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  getRandomFoods: async (req, res) => {
    // const code = req.params.code;
    let randomFoods = [];

    try {
      if (req.params.code) {
        randomFoods = await Food.aggregate([
          { $match: { code: req.params.code, isAvailable: true } },
          { $sample: { size: 5 } },
        ]);
      }

      if (!randomFoods.length) {
        randomFoods = await Food.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 5 } },
        ]);
      }

      if (randomFoods.length) {
        res.status(200).json(randomFoods);
      } else {
        res.status(404).json({
          success: true,
          message: "Oops foods not available!",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Internal server error!",
      });
    }
  },

  searchFoods: async (req, res) => {
    console.log(req.params.keyword);
    try {
      const searchData = await Food.aggregate([
        {
          $search: {
            index: "Foods_search",
            text: {
              query: req.params.keyword,
              path: {
                wildcard: "*", // Ensure this aligns with your document structure
              },
            },
          },
        },
      ]);

      if (!searchData.length) {
        return res.status(404).json({
          success: true,
          message: `Oops, searched foods not found!`,
          data: [],
        });
      }

      res.status(200).json(
        // success: true,
        searchData
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  // RESTAURANT MENU PART...
  getFoodsByRestaurant: async (req, res) => {
    const restaurant = req.params.restaurant;
    if (!validateMongo.isValidId(restaurant)) {
      return res.status(400).json({
        success: false,
        error: `Invalid entries received!`,
      });
    }

    try {
      // TODO ?
      // const foodRestaurant = await Food.aggregate([
      //   { $match: { restaurent: restaurant } },
      //   { $sample: { size: 10 } },
      // ]);

      const foodRestaurant = await Food.find({ restaurant: restaurant });

      res.status(200).json({
        success: true,
        message: ``,
        data: foodRestaurant,
      });
      // console.log(foodRestaurant);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  getFoodsByCategoryAndCode: async (req, res) => {
    const { code, category } = req.params;

    try {
      const FoodsCatCode = await Food.aggregate([
        { $match: { category: category, code: code, isAvailable: true } },
      ]);

      if (!FoodsCatCode.length) {
        return res.status(404).json({
          success: true,
          message: "Oops foods not available!",
          data: [],
        });
      }

      res.status(200).json({
        success: true,
        data: FoodsCatCode,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },

  getRandomFoodsByCategoryAndCode: async (req, res) => {
    const { code, category } = req.params;
    let Foods = [];

    try {
      Foods = await Food.aggregate([
        { $match: { category: category, code: code, isAvailable: true } },
        { $sample: { size: 10 } },
      ]);

      if (!Foods || !Foods.length) {
        Foods = await Food.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 10 } },
        ]);
      }

      if (!Foods || !Foods.length) {
        Foods = await Food.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 10 } },
        ]);
      }

      if (!Foods || !Foods.length) {
        return res.status(404).json({
          success: true,
          message: "Oops foods not available!",
          data: [],
        });
      }

      res.status(200).json({
        success: true,
        data: Foods,
      });
      // res.status(200).json({
      //   code: code,
      //   category: category,
      // });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Internal server error!",
      });
    }
  },
};
