// 'Required modules' section start

//'Downloaded modules' section start
const express = require("express");
const mongoose = require("mongoose");
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
//@route    GET api/member
//desc      get all the member of current group.
//access    private (User authentication required)
router.get("/:group_id", auth, async (req, res) => {
  try {
    //'Check if current user is the member of the requested group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: req.params.group_id,
      status: true,
    });

    //'Check if current user is the member of the requested group' section ends
    if (!isMember) {
      return res.status(400).json({ msg: "Access denied to this group." });
    }

    //'Get all member of the requested group' section starts
    const all_members = await Member.find(
      {
        group_id: req.params.group_id,
        status: true,
      },
      { user_id: 1, _id: 0 }
    );
    //'Get all member of the requested group' section ends

    let user_ids_array = [];

    all_members.forEach((element) => {
      user_ids_array.push(element.user_id);
    });

    const members_res = await User.find(
      { _id: { $in: user_ids_array } },
      { _id: 1, name: 1, email: 1 }
    );
    return res.json(members_res);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//@route    POST api/member/request
//desc      send member request to a group
//access    private (user authentication required)
router.post("/request", auth, async (req, res) => {
  try {
    //'Check if current user has already requsted to this group' section starts
    const isMember = await Member.findOne({
      user_id: req.user.id,
      group_id: req.body.group_id,
    });
    //'Check if current user has already requsted to this group' section ends
    if (isMember) {
      return res.status(400).json({ msg: "Opps! Already requested." });
    }

    //'Check if the requested group exists' section starts
    const isExistingGroup = await Group.findOne({
      _id: req.body.group_id,
    });
    //'Check if the requested group exists' section ends
    if (!isExistingGroup) {
      return res.status(400).json({ msg: "No such group" });
    }
    //'Creating Member-model instance' section starts
    const user_id = req.user.id;
    const group_id = req.body.group_id;
    const status = false;
    member = new Member({
      user_id,
      group_id,
      status,
    });
    //'Creating Member-model instacne section' ends

    //'Add member-request to the group' section starts
    await member.save();
    //'Add member-request to the group' section ends

    res.status(200).json({ msg: "Member-request sent." }); //Send success response
  } catch (err) {
    console.error(err.message);

    //'Send Response for error' section starts
    return res.status(500).send("Server Error!");
    //'Send Response for error' section ends
  }
});
//@route    GET api/member/request
//desc      get all the member-requests
//access    private (user authentication required)
router.get("/request/:group_id", auth, async (req, res) => {
  try {
    //'Check if current user is the admin of the requested group OR if the group exists or not' section starts
    const isValid = await Group.findOne({
      _id: req.params.group_id,
      admin: req.user.id,
    });
    //'Check if current user is the admin of the requested group OR if the group exists or not' section ends
    if (!isValid) {
      return res.status(400).json({ msg: "Access denied to this group." });
    }

    //'Get all member-requests of the requested group' section starts
    const all_member_requests = await Member.find(
      {
        group_id: req.params.group_id,
        status: false,
      },
      { user_id: 1, _id: 0 }
    );
    //'Get all member-request of the requested group' section ends
    let user_ids_array = [];

    all_member_requests.forEach((element) => {
      user_ids_array.push(element.user_id);
    });

    const members_res = await User.find(
      { _id: { $in: user_ids_array } },
      { _id: 1, name: 1, email: 1 }
    );
    return res.json(members_res);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//@route    POST api/member/request
//desc      accept a member-request ( by the admin )
//access    private (user authentication required)
router.post("/request/accept", auth, async (req, res) => {
  try {
    //'Check if the given member has actually sent request to the given group or not' section starts
    const isRequested = await Member.findOne({
      group_id: req.body.group_id,
      user_id: req.body.user_id,
      status: false,
    });
    //'Check if the given member has actually sent request to the given group or not' section ends
    if (!isRequested) {
      return res.status(400).json({ msg: "Invalid Member-request" });
    }

    //'Check if current user is the admin of the requested group OR if the group exists or not' section starts
    const isValid = await Group.findOne({
      _id: req.body.group_id,
      admin: req.user.id,
    });
    //'Check if current user is the admin of the requested group OR if the group exists or not' section ends
    if (!isValid) {
      return res.status(400).json({ msg: "Access denied to this group." });
    }

    //'Accept Request (update status to true)' section starts
    const ret = await Member.findOneAndUpdate(
      { group_id: req.body.group_id, user_id: req.body.user_id, status: false },
      { status: true },
      { new: true }
    );
    //'Accept Request (update status to true)' section ends

    return res.status(200).json({ msg: "Request Accepted." });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//@route    DELETE api/member
//desc      delete a member ( by the admin )
//access    private (user authentication required)
router.post("/remove", auth, async (req, res) => {
  try {
    //'Check if current user is the admin of the requested group OR if the group exists or not' section starts
    const isValid = await Group.findOne({
      _id: req.body.group_id,
      admin: req.user.id,
    });
    //'Check if current user is the admin of the requested group OR if the group exists or not' section ends
    if (!isValid) {
      return res.status(400).json({ msg: "You can't remove a member." });
    }

    //'Delete a member' section starts
    await Member.deleteMany({
      group_id: req.body.group_id,
      user_id: req.body.user_id,
    });
    //'Delete a membe' section ends
    return res.status(200).json({ msg: "Member removed from group." });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error!");
  }
});

//'Routes' section end

//'Export' section start
module.exports = router;
//'Export' section end
