const categoryModel=require('../Models/categoryModel')

//add category 
exports.addCategory=async(req,res)=>{
    try{
        const {categoryName}=req.body;
        const existingCategory=await categoryModel.findOne({
            categoryName,
        })
        if(existingCategory){
            return res.status(400).json("Category already exists")
        }
        const newCategory=new categoryModel({
            categoryName,
        })
        await newCategory.save();
        res.status(200).json(newCategory)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//get all categories
exports.getAllCategories=async(req,res)=>{
    try{
        const allCategories=await categoryModel.find();
        res.status(200).json(allCategories)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}