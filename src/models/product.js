const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be 6 character long"],
    maxLength: [12, "Title must not be much than 12 Character"],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Title must be 6 character long"],
    maxLength: [300, "Title must not be much than 12 Character"],
  },
  price: {
    type: Number,
    min: [100, "Thr price must be grater than 100"],
    required: true,
  },
  category: {
    type: String,
    enum: ["stationary", "electronics", "phone Accessory"],
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  imageId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);