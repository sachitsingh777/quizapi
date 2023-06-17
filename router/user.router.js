const express=require("express");
const bcrypt=require("bcrypt")
const jsw=require("jsonwebtoken")
const { UserModel } = require("../models/user.model");
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password}=req.body
    try{
        bcrypt.hash(password,8,async(err, hash)=>{
            const user=new UserModel({email,password:hash})
            await user.save()
            res.send("registration successfull")
        });
    }
    catch(error){
       res.send("register failed")
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
   
    try{ 
        
        const user=UserModel.findOne({email})
       if(user){
        bcrypt.compare(password,user.password,(err, result)=>{
            if(result){
                var token = jwt.sign({userID:user._id }, 'mock14');
                res.status(200).send({"msg":"login successfull","token":token})
            }else{
                res.status(200).send("invalid credentials")
            }
        });
       }
        
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})

module.exports={userRouter}