const mongoose = require('mongoose');

const adminPostModelSchema = new mongoose.Schema({
     post:{
          type:String,
          required:[true,"Please enter the update"],
     },
     headline:{
          type:String,
          required:[true,"Please enter the headline"],
     },
     user_id:{
          type: mongoose.Schema.ObjectId,
          ref:"User",
          required: true,
     },
     userName:{
          type: String,
          required:true
      },  
     createdAt: {
          type: Date,
          default: Date.now,
     },
});

module.exports = mongoose.model("AdminPost", adminPostModelSchema);