const express = require("express");
const router = express.Router();
const Muguser = require("../models/Muguser");
const MuguserPost = require("../models/MuguserPost");

//My Posts
router.post("/mypost", (req, res) => {
  console.log(req.body);
  Muguser.find({ _id: req.body.id }).then((data) => {
    console.log(data);
    MuguserPost.find({ _id: data[0].mypost }).then((post) => res.json(post));
  }).catch((err)=>next(err));
});

//All Post
router.get("/allpost", (req, res) => {
  console.log('allpost reached');
  MuguserPost.find({}).then((data) => res.json(data)).catch((err)=>next(err));
});

//Important Posts
router.post("/imppost", (req, res) => {
  console.log(req.body);
  Muguser.find({ _id: req.body.id }).then((user) => {
    console.log(user);
    MuguserPost.find({ _id: user[0].impPost }).then((data) => {
      res.json(data);
    });
  }).catch((err)=>next(err));
});

router.get("/post_detail/:id", (req, res) => {
  // Important Here we have to first convert the params in string and the serach by _id
  MuguserPost.findById({ _id: `${String(req.params.id)}` }).then((data) =>
    res.json(data)
  ).catch((err)=>next(err));
});

module.exports = router;
