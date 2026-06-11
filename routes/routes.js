const express = require("express");
const userController = require("../Controllers/userController");
const categoryController = require("../Controllers/categoryController");
const subCategoryController = require("../Controllers/subCategoryController");
const productController = require("../Controllers/productController");
const wishlistController=require('../Controllers/wishlistController')

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.post("/add-category", categoryController.addCategory);
router.get("/all-category", categoryController.getAllCategories);

router.post("/add-subcategory", subCategoryController.addSubCategory);
router.get("/all-subcategory", subCategoryController.getAllSubCategories);

router.post("/add-products", productController.addProduct);
router.get("/single-product/:id", productController.getSingleProduct);
router.get("/all-products", productController.getAllProducts);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);
router.put('/add-varient/:id',productController.addVariant)

router.post("/add-wishlist", wishlistController.addWishlist);
router.get("/wishlist/:userId", wishlistController.getWishlist);
router.delete("/wishlist/:id", wishlistController.removeWishlist);

module.exports = router;
