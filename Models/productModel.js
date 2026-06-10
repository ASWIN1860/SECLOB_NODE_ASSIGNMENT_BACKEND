const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  qty: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },

    variants: [variantSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);