const mongoos = require("mongoose");

const RestaurantSchema = new mongoos.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    foods: {
      type: Array,
      default: [],
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isAvialable: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    ratingCount: {
      type: String,
      default: "256",
    },
    verification: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Verified", "Rejected"],
    },
    verificationMsg: {
      type: String,
      default:
        "Your restaurent is under review. We will notify once it is verified.",
    },
    coords: {
      id: { type: mongoos.Schema.Types.ObjectId },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      latitudeDelta: { type: Number, default: 0.0221 },
      longitudeDelta: { type: Number, default: 0.0221 },
      address: { type: String, required: true },
      title: { type: String, required: true },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoos.model("Restaurant", RestaurantSchema);
