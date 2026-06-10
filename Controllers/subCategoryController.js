const subCategoryModel = require("../Models/subCategoryModel");

//add subcategory
exports.addSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.body;

    const existingSubCategory = await subCategoryModel.findOne({
      categoryId,
      subCategoryName,
    });

    if (existingSubCategory) {
      return res.status(400).json("Sub Category Already Exists");
    }

    const newSubCategory = new subCategoryModel({
      categoryId,
      subCategoryName,
    });

    await newSubCategory.save();

    res.status(200).json(newSubCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all subcategory
exports.getAllSubCategories = async (req, res) => {
  try {
    const allSubCategories = await subCategoryModel
      .find()
      .populate("categoryId");

    res.status(200).json(allSubCategories);
  } catch (err) {
    res.status(500).json(err);
  }
};
