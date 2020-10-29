const express = require("express");
const router = express.Router();
const Muguser = require("../models/Muguser");
const MuguserPost = require("../models/MuguserPost");

//For images
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Create Post Route
// Create New Post and save to post collection
// Then post id of new post and save to mypost array of author id.

router.post("/createpost", upload.single("productImage"), (req, res) => {
  console.log(req.file);

  const newpost = new MuguserPost({
    Heading: req.body.Heading,
    Post_Content: req.body.Post_Content,
    Author: req.body.Author,
    Published_Date: Date.now(),
    Modified_Date: Date.now(),
    productImage: req.file.path,
  });

  newpost
    .save(err=>{return next(err)})
    .then((post) => {
      console.log(post);
      Muguser.updateOne(
        { _id: String(post.Author) },
        { $push: { mypost: post._id } }
      ).then(res.send("Post Created"));
    })
    .catch(next(err));
});

//Edit posts

router.put("/editpost", (req, res) => {
  console.log(req.body);
  MuguserPost.updateOne(
    { _id: req.body.Post_id },
    { $set: { Post_Content: req.body.Post_Content } }
  )
    .then(res.send("Document Updated"))
    .catch(next(err));
});

router.delete("/deletepost", (req, res) => {
  console.log(req.body);
  MuguserPost.deleteOne({ _id: req.body.post_id }, (error) =>
    console.log(error)
  ).then((data) => res.send(data)).catch(next(err));
});

module.exports = router;
