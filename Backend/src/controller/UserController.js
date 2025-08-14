import UserModel from "../modles/user.model.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const RegisterUser = async (req,res) => {
    console.log("RegisterUser called");
    console.log(req.body);
    
    
    try {
        const {UserName,Password} = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({UserName});
        console.log(
    "user",user
        );
        
        if(user){
             return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(Password,10);

        const newUser = await UserModel.create({
        UserName,
        Password:hashedPassword
         });
         const token=jwt.sign({id:newUser._id},"jwtsecretkey",{expiresIn:"1d"})
        res.cookie("token",token)
        
        console.log(token);
        res.status(201).json({message:"User created successfully",
            user:{
            id: newUser._id,
            UserName: newUser.UserName
            }
    });

} 
catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"})
    
}
    }

export const LoginUser = async (req,res) => {

    const {username,password} = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({UserName:username});
    // console.log("user",user);
    const ispasswordValid = await bcrypt.compare(password,user.Password);
    console.log(ispasswordValid);
    if(!user || !ispasswordValid){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token=jwt.sign({id:user._id},"jwtsecretkey",{expiresIn:"1d"})
    res.cookie("token",token)
    // console.log(token);
    
    res.status(200).json({message:"Login successful",
        user:{
            id:user._id,
            UserName:user.UserName
        },token
    });
}
export const LogoutUser = (req, res) => {
  res.clearCookie('token', {
    // It's good practice to match the options used when setting the cookie
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Match your cookie settings
    sameSite: 'strict', // Match your cookie settings
  });
  res.status(200).json({ message: 'Logout successful' });
};
export const GetUserStatus = async (req, res) => {
    // If we reach here, the token is valid because of the middleware.
    // The user's ID was attached to the request object in `verifyToken`.
    const user = await UserModel.findById(req.user.id).select("-Password"); // Don't send the password back!
    res.status(200).json({
        message: "User is authenticated.",
        user: {
            id: user._id,
            UserName: user.UserName,
        },
    });
};