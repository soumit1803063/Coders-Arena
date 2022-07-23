// 'Required modules' section start

//'Downloaded modules' section start
const mongoose = require("mongoose");
//'Downloaded modules' section end

//'Developer-defined modules' section start

//'Developer-defined modules' section end

// 'Required modules' section end.

// 'Comment-Model Schema' section starts

const CommentSchema = mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  commentImage: {
    type: String,
    required: false,
  },
  problem_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problem",
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// 'Comment-Model Schema' section ends

//'Export' section start
module.exports = Problem = mongoose.model("comment", CommentSchema);
//'Export' section end
