const express = require("express");
const router = express.Router();
const Muguser = require("../models/Muguser");
const bcrypt = require("bcrypt");
const passport = require("passport");

// Register User with post method
router.post("/register", (req, res) => {
  //check if all fealds are filled or not
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.username ||
    !req.body.password
  ) {
    res.send("Please fill all details");
  }
  //check if username already exists or not
  // Here you have to nest the if else in promise returned from Muguser.find .
  else if (
    Muguser.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        console.log(user);
        console.log("user found");
        res.send("username already exists please fill different username");
      } else {
        // Create New user with Hashed password
        console.log("New user being created");
        const newuser = new Muguser({
          name: req.body.name,
          age: req.body.age,
          username: req.body.username,
          password: req.body.password,
        });

        // Hash password then save user
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          else {
            bcrypt.hash(newuser.password, salt, (err, hash) => {
              if (err) throw err;
              // set password to hash
              else {
                newuser.password = hash;
                newuser
                  .save()
                  .then((user) => console.log(user))
                  .catch((err) => console.log(err));

                res.end("New user registered");
              }
            });
          }
        });
      }
    })
  ) {
  }
});

// Login Module

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) =>{
      if (err) {
           return next(err);
      }
      const auth_detail = {
        //check in future if sending login_status this is good way or there are alternate way
        login_status: "Logged_In",
        name: user.name,
        age: user.age,
        id: user._id,
      };
      
      return res.json(user);
    });
  })(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
  console.log("logged out");
  req.logout();
  res.send("userlogged out");
});

module.exports = router;
