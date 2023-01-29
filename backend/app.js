const express = require('express');
const app = express();
const cookieParser = require("cookie-parser"); 
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const errorMiddleware = require("./middleware/error");

//CONFIG
dotenv.config({path: "backend/config/config.env"});

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(fileUpload());

//ROUTES
const user = require("./routes/userRoute");
const post = require("./routes/postRoute");
const admin = require("./routes/adminRoute");

app.use("/social",user);
app.use("/social",post);
app.use("/social",admin);

//MIDDLEWARE FOR ERROR
app.use(errorMiddleware);


module.exports = app;