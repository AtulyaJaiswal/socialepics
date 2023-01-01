const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "Please enter your asynchronous username"],
        maxLength:[30, "Name should be less than 30 characters"],
        minLength:[4,"Name should have more than 4 characters"],
        unique: true,
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[validator.isEmail, "Please enter a valid email"],
    },
    phoneNumber:{
        type: Number,
        minLength:[10,"Wrong mobile Number"],
        maxLength:[10,"Wrong mobile Number"],
        required: [true, "Enter your mobile number"],
        unique: [true, "Mobile number already registered"],
    },
    getName:{
        type: String,
        required: true,
    },
    // likedPost:[
    //     {
    //         liked_id:{
    //             type: mongoose.Schema.ObjectId,
    //             ref:"Post",
    //             required: true,
    //         }
    //     }
    // ],
    // password:{
    //     type:String,
    //     required:[true, "Please enter your password"],
    //     minLength:[8,"Password should have more than 8 characters"],
    //     select:false,
    // },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
    },
    followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// //PASSWORD HASHING
// userSchema.pre("save", async function(next){

//     if(!this.isModified("password")){
//         next();
//     }

//     this.password = await bcrypt.hash(this.password,10);

// });

// //COMPARE PASSWORD
// userSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// };

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// //GENERATING PASSWORD RESET TOKEN
// userSchema.methods.getResetPasswordToken = function () {

//     //GENERATING TOKEN
//     const resetToken = crypto.randomBytes(20).toString("hex"); 

//     //HASHING & ADDING resetPasswordToken to UserSchema
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     this.resetPasswordExpire = Date.now() + 15*60*1000;

//     return resetToken;
// };

module.exports = mongoose.model("User", userSchema);