const mongoos = require("mongoose");

const CategorySchema = new mongoos.Schema(
  {
    value: {
      type: String,
      required: [true, "Missing value in category!"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Missing title in category!"],
      unique: true,
    },
    imgUrl: {
      type: String,
      required: [true, "Missing ImgUrl in category!"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoos.model("Category", CategorySchema);
