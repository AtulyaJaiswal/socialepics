const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require('../models/userModel');
const Post = require("../models/postModel");
const SchedulePost = require("../models/schedulePostModel");
const sendToken = require("../utils/jwtToken");
// const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//REGISTER USER
exports.registerUser = catchAsyncErrors(async(req,res,next) => {

    const { userName,email,getName,avatar,phoneNumber } = req.body;

    if(await User.findOne({userName}) != null){
        return(next(new ErrorHandler("User Name already exist",401)));
    }
    if(await User.findOne({phoneNumber}) != null){
        return(next(new ErrorHandler("Mobile Number already exist",401)));
    }

    const user = await User.create({
        userName,email,getName,avatar, phoneNumber
    });
    // console.log(user);

    sendToken(user,201,res);
});

//LOGIN USER
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email} = req.body;

    const user = await User.findOne({ email }); 

    if(!user){
        return next(new ErrorHandler("You are not registered.",401));
    }
    // console.log(user);

    sendToken(user,200,res);

});

//LOGOUT USER
exports.logout = catchAsyncErrors(async (req,res,next) =>{

    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//GET USER DETAILS
exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});

//GET USER POSTS
exports.getUserPosts = catchAsyncErrors(async (req,res,next) => {

    const userPosts = await Post.find({user_id: req.user._id});

    if(!userPosts){
        console.log("yha");
        res.status(200).json({
            success: true,
            userPosts: null,
        });
    }
    
    res.status(200).json({
        success: true,
        userPosts: userPosts.reverse(),
    });
});

//GET USER Scheduled POSTS
exports.getUserScheduledPosts = catchAsyncErrors(async (req,res,next) => {

    const userScheduledPosts = await SchedulePost.find({user_id: req.user._id});

    if(!userScheduledPosts){
        res.status(200).json({
            success: true,
            userScheduledPosts: null,
        });
    }
    
    res.status(200).json({
        success: true,
        userScheduledPosts: userScheduledPosts.reverse(),
    });
});

//GET ALL USERS (ADMIN)
exports.getAllUsers = catchAsyncErrors(async(req,res,next) => {

    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    });
});

//GET SINGLE USER (ADMIN)
exports.getSingleUser = catchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//DELETE USER --ADMIN
exports.deleteUser = catchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

