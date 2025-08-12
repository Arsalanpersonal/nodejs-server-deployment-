const Category = require("../models/categoryModel");

module.exports = {
  createCategory: async (req, res) => {
    const { value, title, imgUrl } = req.body;

    if (!value || !title || !imgUrl)
      return res.status(400).json({
        success: false,
        message: "You have a missing field!",
      });



    const isExist = await Category.findOne({
      $or: [{ value: value }, { title: title }],
    });


    if (isExist)
      return res.status(400).json({
        success: false,
        message: `Category '${isExist.title}' already exist!`,
      });


    // STR model conversation..
    const newCategory = new Category(req.body);
    
    try {
      await newCategory.save();
      res.status(201).json({
        success: true,
        message: `New category '${title}' created succesfuly!`,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Internal server error!",
      });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find({ title: { $ne: "MORE" } });

      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Internal server error!",
      });
    }
  },

  getRendomCategory: async (req, res) => {
    try {
      let categories = await Category.aggregate([
        { $match: { value: { $ne: "more" } } },
        { $sample: { size: 5 } },
      ]);

      const moreCatgories = await Category.findOne({ value: "more" });

      if (moreCatgories) {
        categories.push(moreCatgories);
      }

      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Internal server error!",
      });
    }
  },
};
