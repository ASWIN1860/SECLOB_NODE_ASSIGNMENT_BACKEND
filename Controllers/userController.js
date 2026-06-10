const userModel=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.signup=async(req,res)=>{
    try{
        const {username,password,email}=req.body
        console.log(req.body)
        if(!username || !email || !password){
        res.status(400).json("Invalid Data ")
        }
        else{
            const existuser=await userModel.findOne({email})
            if(existuser){
                res.status(400).json("User Already exist")
            }
            else{
                const user=new userModel({
                    username:username,email:email,password:password
                })
                await user.save()
                res.status(200).json("Signup Success")
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(404).json("Something went Wrong!!")
    }
    
}

exports.signin=async(req,res)=>{
   try{
     const {password,email}=req.body
    if(!email || !password){
        res.status(400).json("Invalid Data")
    }
    else{
        const user=await userModel.findOne({email,password})
        if(user){
            const token=jwt.sign({email:user?.email,role:user?.role},process.env.SECRET_KEY)
            res.status(200).json({token,username:user?.username,profile:user?.profile,role:user?.role,bio:user?.bio})
        }
        else{
            res.status(400).json("Invalid Email/Password")
        }
    }
   }
   catch(err){
    console.log(err)
    res.status(500).json(err)
   }
}