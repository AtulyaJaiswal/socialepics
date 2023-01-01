const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post:{
        type:String,
        required:[true,"Please enter your thoughts"],
    },
    topic:{
        type:String,
        required:true,
        maxLength:[30, "Topic should be less than 30 characters"],
    },
    hearts:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    condolences:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    comments:[
        {
            comment_user_id:{
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required: true,
            },
            comment_userName:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    user_id:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
    userName:{
        type: String,
        required:true
    },  
    avatarColor:{
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);