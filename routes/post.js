const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Muguser = require("../models/Muguser");
const MuguserPost = require("../models/MuguserPost");

//My Posts
router.post("/mypost", (req, res) => {
  console.log(req.body);
  Muguser.find({ _id: req.body.id }).then((data) => {
    MuguserPost.find({ _id: data[0].mypost }).then((post) => res.json(post));
  }).catch((err)=>next(err));
});

//All Post
router.post("/allpost", (req, res, next) => {
  Muguser.find({_id:req.body.id})
  .then((data) => {
    let followings = data[0].following;
    MuguserPost.find({}).then(posts=>{
     res.json(posts.map(post=>{
        if (followings.indexOf(post.Author) > -1) {
          return Object.freeze({...post._doc, following_status: "Following"});
        } else {
          return Object.freeze({...post._doc, following_status: "Follow"});
        }
      }));
      
    });
  }).catch((err)=>next(err));
});

//Important Posts
router.post("/imppost", (req, res, next) => {
// Find user with help of current id

  Muguser.find({ _id: req.body.id })
  .then(user=>{
    Muguser.find({_id:(user[0].following)})
    .then(users=>{
// I think here the event loop is blocked due to processing. "I might be wrong. Please Clarify".
// There could be issue of memory leak here. "I might be wrong. Please Clarify".
//Can we use async await here. or anyother way to write an asynchronous function.
      let ImpPost = users.map(item=>{return item.mypost})
      for(i=0; i<ImpPost.length; i++){
        ImpPost[0].concat(ImpPost[i])
      }
      
      MuguserPost.find({_id:ImpPost[0]}).then(posts=>{
// I don't think here we will face memory leak issue. "I might be wrong. Please Clarify".
        res.json(posts.map(post=>{
          return Object.freeze({...post._doc, following_status: "Following"});
        }))})
    })
  })
  .catch((err)=>next(err));
});


router.get("/post_detail/:id", (req, res) => {
  // Important Here we have to first convert the params in string and the serach by _id
  MuguserPost.findById({ _id: `${String(req.params.id)}` }).then((data) =>
    res.json(data)
  ).catch((err)=>next(err));

});

router.get("/post_detail/:id", (req, res) => {
  // Important Here we have to first convert the params in string and the serach by _id
  MuguserPost.find({}).then((data) =>
    res.json(data)
  ).catch((err)=>next(err));

});

module.exports = router;
