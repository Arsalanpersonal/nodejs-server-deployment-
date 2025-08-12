const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const con = await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    if (con) {
      console.log(`App database connected successfully!`);
      return true;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error!",
    });
  }
};
