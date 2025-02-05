const mongoose = require("mongoose");
const bikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },

    description: {
      type: String,
      required: true,
      min: 10,
      max: 1000,
    },

    price: {
      type: Number,
      required: true,
      min: 1000,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Sports", "Commuter", "Off-road", "Electric", "Touring"],
    },

    year: {
      type: Number,
      required: true,
      min: 1900,
    },

    kilometers: {
      type: Number,
      required: true,
      min: 100,
    },

    location: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available",
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);
