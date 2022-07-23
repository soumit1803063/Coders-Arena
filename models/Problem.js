// 'Required modules' section start

//'Downloaded modules' section start
const mongoose = require("mongoose");
//'Downloaded modules' section end

//'Developer-defined modules' section start

//'Developer-defined modules' section end

// 'Required modules' section end.

// 'Problem-Model Schema' section starts

const ProblemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  tag: [
    {
      type: String,
      required: true,
      default: "unknown",
    },
  ],
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// 'Problem-Model Schema' section ends

//'Export' section start
module.exports = Problem = mongoose.model("problem", ProblemSchema);
//'Export' section end
