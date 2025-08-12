const mongoos = require("mongoose");

const FoodSchema = new mongoos.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    foodTags: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    foodType: {
      type: Array,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    restaurant: {
      type: mongoos.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 3,
      min: 1,
      max: 5,
    },
    ratingcount: {
      type: String,
      default: "256",
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    additives: {
      type: Array,
      default: [],
    },
    imgUrl: {
      type: Array,
      default:[],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoos.model("Food", FoodSchema);
