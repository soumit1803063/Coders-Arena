// 'Required modules' section start

//'Downloaded modules' section start
const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const auth = require("../../middleware/auth");
const Group = require("../../models/Group");
const Member = require("../../models/Member");
const Problem = require("../../models/Problem");
const Comment = require("../../models/Comment");
const removeUploadedFiles = require("multer/lib/remove-uploaded-files");
//'Developer-defined modules' section end

// 'Required modules' section end.
let file_name = "";
//'File store' section starts
Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    file_name = `${crypto.randomBytes(20).toString("hex")}.${
      file.originalname
    }`;
    cb(null, file_name);
  },
});

const upload = multer({
  storage: Storage,
}).single("commentImage");
//'File store' section ends

//'Routes' section
//@route    GET api/comment
//desc      Get all the comments of a problem.
//access    private (User authentication required)
router.get("/:problem_id", auth, async (req, res) => {
  try {
    //'Check if the problem exits or not' section starts
    problem = await Problem.findOne({
      _id: req.params.problem_id,
    });
    //'Check if the problem exits or not' section ends
    if (!problem) {
      return res.status(400).json({ msg: "No such problem." });
    }

    //'Check if current user is the member of the group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: problem.group_id,
      status: true,
    });

    //'Check if current user is the member of the group' section ends
    if (!isMember) {
      return res.status(400).json({ msg: "Access denied." });
    }

    const comment = await Comment.find({
      problem_id: req.params.problem_id,
    });

    let sender_ids_array = [];

    comment.forEach((element) => {
      sender_ids_array.push(element.sender_id);
    });
    const senders = await User.find({ _id: { $in: sender_ids_array } });

    let senders_id_name = {};
    senders.forEach((element) => {
      let user_id = element.id;
      let user_name = element.name;
      senders_id_name[user_id] = user_name;
    });

    return res.json([comment, [senders_id_name]]);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//@route    POST api/comment
//desc      post a comment under a problem
//access    private (user authentication required)
router.post("/", upload, auth, async (req, res) => {
  try {
    //'Check if the problem exits or not' section starts
    problem = await Problem.findOne({
      _id: req.body.problem_id,
    });
    //'Check if the problem exits or not' section ends
    if (!problem) {
      return res.status(400).json({ msg: "No such problem." });
    }

    //'Check if current user is the member of the group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: problem.group_id,
      status: true,
    });

    //'Check if current user is the member of the group' section ends
    if (!isMember) {
      return res.status(400).json({ msg: "Access denied to this group." });
    }
    //'Creating Problem-model instance' section starts

    const commentText = req.body.commentText;
    const commentImage = file_name;
    const problem_id = req.body.problem_id;
    const sender_id = req.user.id;

    //'Creating a Comment-Model Instance' section starts
    let comment = new Comment({
      commentText,
      commentImage,
      problem_id,
      sender_id,
    });
    //'Creating Problem-model instacne section' ends

    //'Post a comment' section starts
    comment.save();
    //'Post a comment' section ends

    res.status(200).json({ msg: "Comment posted." }); //Send success response
  } catch (err) {
    console.error(err.message);

    //'Send Response for error' section starts
    return res.status(500).send("Server Error!");
    //'Send Response for error' section ends
  }
});

//'Routes' section end

//'Export' section start
module.exports = router;
//'Export' section end
