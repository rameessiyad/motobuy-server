const mongoose = require("mongoose");
const bikeSchema = new mongoose.Schema(
  {
    title: {
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

    state: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    ownership: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "expired", "reported"],
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
