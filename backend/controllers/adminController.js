const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const AdminPost = require("../models/adminPostModel");

//CREATE POST
exports.createUpdatePost = catchAsyncErrors(async(req,res,next) => {

     const{update,headline} = req.body;
     
     const adminPost = await AdminPost.create({
         post:update,
         headline,
         user_id:req.user._id,
         userName:req.user.userName,
     });
     // console.log(posts);
 
     res.status(201).json({
         success: true,
         adminPost
     })
});

//Get All Post
exports.getAllUpdatePosts = catchAsyncErrors(async(req,res,next) => {

    const updatePosts = await AdminPost.find();
    updatePosts.reverse();

    res.status(200).json({
        success: true,
        updatePosts,
    })
});