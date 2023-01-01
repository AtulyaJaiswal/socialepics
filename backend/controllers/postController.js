const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Post = require("../models/postModel");
const User = require("../models/userModel");

//CREATE POST
exports.createPost = catchAsyncErrors(async(req,res,next) => {

    const{text,topic} = req.body;
    
    const post = await Post.create({
        post:text,
        topic,
        user_id:req.user._id,
        userName:req.user.userName,
        avatarColor: req.user.avatar,
        hearts: [],
    });
    // console.log(posts);

    res.status(201).json({
        success: true,
        post
    })
});

//DELETE POST
exports.deletePost = catchAsyncErrors(async(req,res,next) => {
    const post  = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }

    await post.remove();

    res.status(200).json({
        success:true,
        message: "Post deleted successfully"
    });
});

//Likes Dislikes
exports.likePost = catchAsyncErrors(async(req,res,next) => {
    
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.hearts.includes(req.user._id)) {
      const index = post.hearts.indexOf(req.user._id);

      post.hearts.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post disliked",
      });
    } else {
      post.hearts.push(req.user._id);


      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
});
exports.dislikePost = catchAsyncErrors(async(req,res,next) => {
    
    const {id} = req.body;
    const post  = await Post.findById(id);
    console.log(post);
    
    const isLiked = post.hearts.find((heart) => {
        console.log(heart);
        return heart.heart_user_id.toString()===req.user._id.toString()
    }
        
    );

    const isDisliked = post.condolences.find((cond) => 
        cond.condolence_user_id.toString()===req.user._id.toString()
    );
    
    // console.log(isLiked);
    // console.log(isDisliked);
    res.status(200).json({
        success:true,
    });
});

//Get All Post
exports.getAllPosts = catchAsyncErrors(async(req,res,next) => {

    const posts = await Post.find();
    // posts=posts.comments.reverse();
    // console.log(posts);
    res.status(200).json({
        success: true,
        posts: posts.reverse(),
    })
});

//Get Specific Post
exports.getSpecificPosts = catchAsyncErrors(async(req,res,next) => {

    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Product not found", 404));
    }
    
    res.status(200).json({
        success: true,
        post
    });
});

//ADD COMMENT
exports.createComment = catchAsyncErrors(async(req,res,next) => {

    const { comment, id } = req.body;

    const post = await Post.findById(id);

    const newComment = {
        comment_user_id: req.user._id,
        comment_userName: req.user.userName,
        comment
    }

    post.comments.push(newComment);

    await post.save({validateBeforeSave: false});
    
    res.status(200).json({
        success: true,
    });
});