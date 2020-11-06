//Delcaration section
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const Muguser = require("./models/Muguser.js");
const MuguserPost = require("./models/MuguserPost");
const path = require("path");
require('dotenv').config();
require("./passport_Auth_Strategy/auth")(passport);
//Database Connection


mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true }).then(() => console.log("database connected"));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

//passport middleware

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


//User Registeration, Login and Logout routes
app.use("/user", require("./routes/user"));

//Handling Autharization
const isauthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.end("First login");
  }
};

//Middleware for Uploading Static Files and Images
app.use("/uploads", express.static("uploads"));
app.use(express.static("build"));
//Allpost Important_Post and Mypost and fullPost/PostDetails route
app.use("/post", require("./routes/post"));
//Create Edit and Delete Post Route
app.use("/create", require("./routes/createpost"));
//follow users route
app.use("/connection", require("./routes/follow"));

//Error Handling Middleware

app.use((err, req, res, next) => {
  console.log(err);
  res.json(err);
});

//Listening to port number at port 8000
app.listen(process.env.port, () => console.log("app is listenting to port 8000"));
