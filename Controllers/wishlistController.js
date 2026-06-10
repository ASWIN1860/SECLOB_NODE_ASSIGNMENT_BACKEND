const wishlistModel = require("../Models/wishlistModel");

//add wishlist
exports.addWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingProduct = await wishlistModel.findOne({
      userId,
      productId,
    });

    if (existingProduct) {
      return res.status(400).json("Product already in wishlist");
    }

    const newWishlist = new wishlistModel({
      userId,
      productId,
    });

    await newWishlist.save();

    res.status(200).json(newWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await wishlistModel.find({ userId }).populate("productId");

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
};

//remove wishlist
exports.removeWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    await wishlistModel.findByIdAndDelete(id);

    res.status(200).json("Removed from wishlist");
  } catch (err) {
    res.status(500).json(err);
  }
};
