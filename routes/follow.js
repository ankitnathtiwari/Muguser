const express = require("express");
const router = express.Router();
const Muguser = require("../models/Muguser");
const MuguserPost = require("../models/MuguserPost");

router.post("/follow", (req, res) => {
  Muguser.updateOne( { _id: req.body.req_from },{ $push: { following: req.body.req_to } })
  .then(Muguser.updateOne({ _id: req.body.req_to },{ $push: { followers: req.body.req_from } })
  .then(res.send("Following"))
  ).catch(err=>next(err));
});

router.post("/unfollow", (req, res, next) => {
  console.log(req.body);
  Muguser.updateOne({_id:req.body.req_from}, {$pull:{following:req.body.req_to}})
  .then(Muguser.updateOne({_id:req.body.req_to}, {$pull:{followers:req.body.req_from}})
  .then(res.send("unfollowed")))
});

module.exports = router;
