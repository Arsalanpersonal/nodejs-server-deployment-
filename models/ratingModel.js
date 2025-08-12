const mongoos = require("mongoose");

const RatingSchema = new mongoos.Schema(
  {

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoos.model("Rating", RatingSchema);
