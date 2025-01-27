const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cafe",
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
