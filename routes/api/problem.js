// 'Required modules' section start

//'Downloaded modules' section start
const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const { check, validationResult } = require("express-validator");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Group = require("../../models/Group");
const Member = require("../../models/Member");
const Problem = require("../../models/Problem");
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
}).single("problemImage");
//'File store' section ends

//'Routes' section
//@route    GET api/problem/all
//desc      Get all the problems from a specific group.
//access    private (User authentication required)
router.get("/all", auth, async (req, res) => {
  try {
    //'Check if current user is the member of the requested group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: req.body.group_id,
      status: true,
    });

    //'Check if current user is the member of the requested group' section ends
    if (!isMember) {
      return res.status(400).json({ msg: "Access denied to this group." });
    }

    //'Get the problems with the specifiq tags from the specifiq group' section starts
    const problems = await Problem.find({
      group_id: req.body.group_id,
    });
    //'Get the problems with the specifiq tags from the specifiq group' section ends

    return res.json(problems);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//'Routes' section
//@route    GET api/problem
//desc      Get all the problems with the specific tags from the specific group.
//access    private (User authentication required)
router.get("/", auth, async (req, res) => {
  try {
    //'Check if current user is the member of the requested group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: req.body.group_id,
      status: true,
    });

    //'Check if current user is the member of the requested group' section ends
    if (!isMember) {
      return res.status(400).json({ msg: "Access denied to this group." });
    }

    //'Get the problems with the specifiq tags from the specifiq group' section starts
    const problems = await Problem.find({
      group_id: req.body.group_id,
      tag: { $in: [req.body.tag] },
    });
    //'Get the problems with the specifiq tags from the specifiq group' section ends

    return res.json(problems);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//@route    POST api/problem
//desc      post a problem to a group
//access    private (user authentication required)
router.post("/", auth, upload, async (req, res) => {
  try {
    //'Check if current user is the member of this group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: req.body.group_id,
      status: true,
    });
    //'Check if current user is the member of this group' section ends

    if (!isMember) {
      return res
        .status(400)
        .json({ msg: "Opps! Access denied to this group." });
    }

    //'Creating Problem-model instance' section starts

    const name = req.body.name;
    const link = req.body.link;
    const description = req.body.description;
    const image = file_name;
    const tag = req.body.tag;
    const sender_id = req.user.id;
    const group_id = req.body.group_id;
    problem = new Problem({
      name,
      link,
      description,
      image,
      tag,
      sender_id,
      group_id,
    });
    //'Creating Problem-model instacne section' ends

    //'Post a problem to the group' section starts
    problem.save();
    //'Post a problem to the group' section ends

    res.status(200).json({ msg: "Problem posted." }); //Send success response
  } catch (err) {
    console.error(err.message);

    //'Send Response for error' section starts
    return res.status(500).send("Server Error!");
    //'Send Response for error' section ends
  }
});

//@route    PUT api/problem
//desc      edit a problem ( by the admin,editor and problem sender )
//access    private (user authentication required)
router.put("/", auth, upload, async (req, res) => {
  try {
    //'Check if the problem exists' section starts
    const problem = await Problem.findOne({
      _id: req.body.problem_id,
    });
    //'Check if the problem exists' section ends
    if (!problem) {
      return res.status(400).json({ msg: "No such problem" });
    }

    //'Check if the current user is the admin or editor  ' section starts
    const isAdmin = await Group.findOne({
      _id: problem.group_id,
      $or:[{admin:req.user.id},{editor: { $in: [req.user.id] }}]
    });
    //'check if the current user is the admin or editor' section ends

 
    const isValid = (isAdmin!=null || problem.sender_id==req.user.id);
     
    if (!isValid) {
      return res.status(400).json({ msg: "Access denied!" });
    }

    //'Update a problem' section starts
    const ret = await Problem.findOneAndUpdate(
      { _id:problem._id},
      { name:req.body.name,
        link:req.body.link,
        description:req.body.description,
        image:file_name,
        tag:req.body.tag
      },
      { new: true }
    );
    //'Update a problem' section ends
    const problem1 = await Problem.findOne({
      _id: req.body.problem_id,
    });

    return res.status(200).json({ msg: "Problem Updated.",info:problem1 });
    

  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//@route    DELETE api/problem
//desc      delete a member ( by the admin )
//access    private (user authentication required)
router.delete("/", auth, async (req, res) => {
  try {
    //'Check if the problem exists' section starts
    const problem = await Problem.findOne({
      _id: req.body.problem_id,
    });
    //'Check if the problem exists' section ends
    if (!problem) {
      return res.status(400).json({ msg: "No such problem" });
    }

    //'Check if the current user is the admin or editor  ' section starts
    const isAdmin = await Group.findOne({
      _id: problem.group_id,
      $or:[{admin:req.user.id},{editor: { $in: [req.user.id] }}]
    });
    //'check if the current user is the admin or editor' section ends

 
    const isValid = (isAdmin!=null || problem.sender_id==req.user.id);
     
    if (!isValid) {
      return res.status(400).json({ msg: "Access denied!" });
    }
   
    //'Delete the problem' section starts
    await Problem.deleteMany({
      _id: problem._id
    });

    //'Delete the problem' section ends
    return res.status(200).json({ msg: "Problem deleted." });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//'Routes' section end

//'Export' section start
module.exports = router;
//'Export' section end
