// 'Required modules' section start

//'Downloaded modules' section start

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");
const router = express.Router();
const { check, validationResult } = require("express-validator");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Group = require("../../models/Group");
const Member = require("../../models/Member");
//'Developer-defined modules' section end

// 'Required modules' section end.

//'Routes' section
//@route    GET api/group
//desc      get all the group of the currently logged-in user.
//access    private (User authentication required)
router.get("/", auth, async (req, res) => {
  try {
    const all_groups = await Member.find(
      { user_id: req.user.id, status: true },
      { group_id: 1, _id: 0 }
    ); //Get all the groups ,which current user is the member in.
    if (!all_groups) {
      return res.status(400).json({ msg: "There is no group for this user" });
    }
    const groups = await Group.find({ id: { $in: all_groups } });
    res.json(groups.reverse());
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error!");
  }
});

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
}).single("groupImage");
//'File store' section ends

//@route    POST api/group
//desc      create a group
//access    private (user authentication required)
router.post(
  "/",
  upload,
  [auth, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    //'name validation' section starts
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //'name validation' section ends

    try {
      const { name, description } = req.body;
      const admin = req.user.id;
      const editor = [req.user.id];
      // console.log(req.file);
      //'Creating Group-model instance' section starts
      group = new Group({
        name,
        description,
        image: req.file.filename,
        admin,
        editor,
      });
      //'Creating Group-model instacne section' ends

      //'Save group to database' section starts
      await group.save();
      //'Save group to database' section ends

      //'Creating Member-model instance' section starts
      const user_id = req.user.id;
      const group_id = group.id;
      const status = true;
      member = new Member({
        user_id,
        group_id,
        status,
      });
      //'Creating Member-model instacne section' ends

      //'Add member to the group' section starts
      await member.save();
      //'Add member to the group' section ends

      res.status(200).json({ msg: "New group created!", id: group.id }); //Send success response
    } catch (err) {
      console.error(err.message);

      //'Send Response for error' section starts
      return res.status(500).send("Server Error!");
      //'Send Response for error' section ends
    }
  }
);

//@route    DELETE api/group
//desc      delete a group by admin.
//access    private (User authentication required)
router.delete("/", auth, async (req, res) => {
  try {
    const ret = await Group.findOne({ admin: req.user.id, _id: req.body._id });
    if (ret) {
      //'Remove Group where current user is the admin' section starts
      await Group.deleteMany({ admin: req.user.id, _id: req.body._id });
      //'Remove Group where current user is the admin' section ends

      //'Remove the group-members' section starts
      await Member.deleteMany({ group_id: req.body._id });
      //'Remove the group-members' section ends
      res.status(200).json({ msg: "Group deleted!" });
    } else {
      res.status(200).json({ msg: "Opps! Deletion denied." });
    }
  } catch (err) {
    console.error(err.message);

    //'Send Response for error' section starts
    return res.status(500).send("Server Error. Deletion Denied!");
    //'Send Response for error' section ends
  }
});
//'Routes' section end

//'Export' section start
module.exports = router;
//'Export' section end
