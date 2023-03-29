const mongoose = require("mongoose");
const replyComment = require("./replyComment");
let ObjectId = mongoose.Schema.Types.ObjectId;
const commentSchema = mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },

  /*  by this there is no need to take post id in params while editing 
or deleting comment by comment id easily can find the post id and can make changes in that particular post (commment)
 */
  // but i haven't used this   .....
  post: {
    type: ObjectId,
    ref: "Post",
  },
  replyComment: {
    type: ObjectId,
    ref: "ReplyComment",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
