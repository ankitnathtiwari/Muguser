const express = require("express");
const router = express.Router();
const Muguser = require("../models/Muguser");
const MuguserPost = require("../models/MuguserPost");

router.post("/follow", (req, res) => {
  Muguser.updateOne(
    { _id: req.body.req_from },
    { $push: { following: req.body.req_to } }
  ).then(
    Muguser.updateOne(
      { _id: req.body.req_to },
      { $push: { followers: req.body.req_from } }
    ).then(
      Muguser.find({ _id: req.body.req_from }).then((data) => res.send(data))
    )
  ).catch(next(err));
});

module.exports = router;
