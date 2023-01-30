const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Post = require("../models/postModel");
// const User = require("../models/userModel");
const SchedulePost = require("../models/schedulePostModel");
// const ApiFeatures = require("../utils/apiFeatures");

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

//Schedule Post Controller
exports.createSchedulePost = catchAsyncErrors(async(req,res,next) => {

    const{text,topic,scheduleTime} = req.body;
    // const arr = scheduleTime.split(" ");
    // const d=new Date(parseInt(arr[0]),parseInt(arr[1]),parseInt(arr[2]),parseInt(arr[3])+6,parseInt(arr[4])-30);
    // console.log(text+" "+topic+" "+scheduleTime);
    
    const post = await SchedulePost.create({
        post:text,
        topic,
        user_id:req.user._id,
        userName:req.user.userName,
        avatarColor: req.user.avatar,
        hearts: [],
        expectedPostTime:scheduleTime,
    });
    // console.log(post);

    res.status(201).json({
        success: true,
        post
    })
});

//Update Schedule Posts
exports.getAllSchedulePosts = catchAsyncErrors(async(req,res,next) => {

    const posts = await SchedulePost.find();
    posts.reverse();
    const date=new Date().getDate();
    const year=new Date().getFullYear();
    const month=new Date().getMonth();
    const hour=new Date().getHours();
    const minute=new Date().getMinutes();
    // console.log(year+" "+month+" "+date+" "+hour+" "+minute);
    posts.forEach(search);
    async function search(post){
        // console.log(post);
        const arr = post.expectedPostTime.split(" ");
        // console.log(arr);
        if(parseInt(arr[0])>year){
            next;
        }
        else if(parseInt(arr[0])===year){
            if(parseInt(arr[1])>month+1){
                next;
            }
            else if(parseInt(arr[1])===month+1){
                if(parseInt(arr[2])>date){
                    next;
                }
                else if(parseInt(arr[2])===date){
                    if(parseInt(arr[3])>hour){
                        next;
                    }
                    else if(parseInt(arr[3])===hour){
                        if(parseInt(arr[4])>minute){
                            next;
                        }
                        else{
                            const posting = await Post.create({
                                post:post.post,
                                topic:post.topic,
                                user_id:post.user_id,
                                userName:post.userName,
                                avatarColor: post.avatarColor,
                                hearts: [],
                            });
                            const deletePost  = await SchedulePost.findById(post._id);
                    
                            if(!deletePost){
                                return next(new ErrorHandler("Post not found", 404));
                            }
                    
                            await deletePost.remove();
                        }
                    }
                    else{
                        const posting = await Post.create({
                            post:post.post,
                            topic:post.topic,
                            user_id:post.user_id,
                            userName:post.userName,
                            avatarColor: post.avatarColor,
                            hearts: [],
                        });
                        const deletePost  = await SchedulePost.findById(post._id);
                
                        if(!deletePost){
                            return next(new ErrorHandler("Post not found", 404));
                        }
                
                        await deletePost.remove();
                    }
                }
                else{
                    const posting = await Post.create({
                        post:post.post,
                        topic:post.topic,
                        user_id:post.user_id,
                        userName:post.userName,
                        avatarColor: post.avatarColor,
                        hearts: [],
                    });
                    const deletePost  = await SchedulePost.findById(post._id);
            
                    if(!deletePost){
                        return next(new ErrorHandler("Post not found", 404));
                    }
            
                    await deletePost.remove();
                }
            }
            else{
                const posting = await Post.create({
                    post:post.post,
                    topic:post.topic,
                    user_id:post.user_id,
                    userName:post.userName,
                    avatarColor: post.avatarColor,
                    hearts: [],
                });
                const deletePost  = await SchedulePost.findById(post._id);
        
                if(!deletePost){
                    return next(new ErrorHandler("Post not found", 404));
                }
        
                await deletePost.remove();
            }
        }
        else{
            const posting = await Post.create({
                post:post.post,
                topic:post.topic,
                user_id:post.user_id,
                userName:post.userName,
                avatarColor: post.avatarColor,
                hearts: [],
            });
            const deletePost  = await SchedulePost.findById(post._id);
    
            if(!deletePost){
                return next(new ErrorHandler("Post not found", 404));
            }
    
            await deletePost.remove();
        }
    }

    res.status(200).json({
        success: true,
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

//DELETE SCHEDULED POST
exports.deleteScheduledPost = catchAsyncErrors(async(req,res,next) => {
    const post  = await SchedulePost.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }

    await post.remove();

    res.status(200).json({
        success:true,
        message: "Scheduled Post deleted successfully"
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
    posts.reverse();

    res.status(200).json({
        success: true,
        posts,
    })
});

//Get ALl Trends
exports.getAllTrends = catchAsyncErrors(async(req,res,next) => {

    const date=new Date().getDate();
    const year=new Date().getFullYear();
    const month=new Date().getMonth();
    const lastFive = await Post.find({ createdAt: {$gte: year+"-"+month+1+"-"+(date-5)+"T18:31:49.054Z"} }).exec();

    var freq = {};
    lastFive.forEach(search);
    function search(str){
        if (freq[str.topic]) {
            freq[str.topic]++;
        } else {
            freq[str.topic] = 1;
        }
    }
    var keys = Object.keys(freq);
    var values = Object.values(freq);
    var trends = keys.map((e,i)=>({name:keys[i],value:values[i]}))
    trends.sort(function (a, b) {
        return b.value - a.value;
    });
    trends.slice(0,5);
    // console.log(freq);
    res.status(200).json({
        success: true,
        trends
    })

});

//Get Trends Post
exports.getSpecificTrendPosts = catchAsyncErrors(async(req,res,next) => {

    const trend=req.query.trend;
    const trendPosts = await Post.find({topic: trend});
    
    res.status(200).json({
        success: true,
        trendPosts
    });
});

//Get Specific Post
exports.getSpecificPosts = catchAsyncErrors(async(req,res,next) => {

    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }
    // console.log(post);
    
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

//DELETE COMMENT
exports.deleteComment = catchAsyncErrors(async(req,res,next) => {

    const post = await Post.findById(req.params.id);

    // console.log(req.params.id);
    // console.log(req.body.commentId);
    // console.log(req.user);
    // console.log(post);

    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }

    // Checking for owner
    if (post.user_id.toString() === req.user._id.toString()) {
        if (req.body.commentId === undefined) {
          return res.status(400).json({
            success: false,
            message: "Comment Id is required",
          });
        }
  
        post.comments.forEach((item, index) => {
          if (item._id.toString() === req.body.commentId) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Selected Comment has deleted",
        });
    }
    else{
        post.comments.forEach((item, index) => {
          if (item.user_id.toString() === req.user._id.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Your Comment has deleted",
        });
    }
});