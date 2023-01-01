//SOCIAL-EPICS


const app = require('./app');
const express=require('express');
const dotenv = require('dotenv');
// const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const path=require("path");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaught Exception`);
    process.exit(1);    
});

//CONFIG

//CONNECT DATABASE
connectDatabase();

//CLOUDINARY
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({path: "backend/config/config.env"});
}

//VERCEL-PROD
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.resolve(__dirname,"../frontend","build")))
    app.get('/*', (req,res) => {
        res.sendFile(path.resolve(__dirname,"../frontend","build","index.html"))
    });
}

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running on ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandled rejection`);

    server.close(() => {
        process.exit(1);
    });
});