// 'Required modules' section start

//'Downloaded modules' section start
const mongoose = require("mongoose");
//'Downloaded modules' section end

//'Developer-defined modules' section start

//'Developer-defined modules' section end

// 'Required modules' section end.

// 'Member-Model Schema' section starts

const MemberSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: Boolean,
    default: false, //false==> Requested to be member, true==> Accepted as the member of this group
  },
});

// 'member-Model Schema' section ends

//'Export' section start
module.exports = Member = mongoose.model("member", MemberSchema);
//'Export' section end
