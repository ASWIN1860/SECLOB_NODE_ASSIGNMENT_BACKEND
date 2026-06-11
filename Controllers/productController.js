const productModel = require("../Models/productModel");

//add products
exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      imageUrl,
      categoryId,
      subCategoryId,
      variants,
    } = req.body;

    const newProduct = new productModel({
      productName,
      description,
      imageUrl,
      categoryId,
      subCategoryId,
      variants,
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("categoryId")
      .populate("subCategoryId");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get single products
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel
      .findById(id)
      .populate("categoryId")
      .populate("subCategoryId");

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all products with search + filter + pagination
exports.getAllProducts = async (req, res) => {
  try {
    const searchKey = req.query.search || "";
    const subCategoryId = req.query.subcategory || "";

    const page = Number(req.query.page) || 1;
    const limit = 3;

    let query = {};

    // Search
    if (searchKey) {
      query.productName = {
        $regex: searchKey,
        $options: "i",
      };
    }

    // Filter by Sub Category
    if (subCategoryId) {
      query.subCategoryId = subCategoryId;
    }

    const totalProducts = await productModel.countDocuments(query);

    const products = await productModel
      .find(query)
      .populate("categoryId")
      .populate("subCategoryId")
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//add varient
exports.addVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const { ram, price, qty } = req.body;

    const product = await productModel.findById(id);

    product.variants.push({
      ram,
      price,
      qty,
    });

    await product.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productModel.findByIdAndDelete(id);

    res.status(200).json("Product Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
