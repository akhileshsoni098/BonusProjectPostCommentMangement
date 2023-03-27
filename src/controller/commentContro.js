const { isValidObjectId } = require("mongoose");
const ReplyCommentModel = require("../model/replyComment") 
const PostModel = require("../model/postModel");
const CommentModel = require("../model/comment");

const createComment = async function (req, res) {
  try {
    let postId = req.params.postId;

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid Object id " });
    }
    const data = req.body;
    const { name, content } = data;
    post = data.post = postId;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          message: "please provide something to comment",
        });
    }

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide your name" });
    }
    if (!content) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide content for your comment",
        });
    }

    const saveComment = await CommentModel.create(data);

    await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $set: { commentId: saveComment._id } }
    );

    res.status(201).send({ status: true, data: saveComment });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//================================================ reply comment ============================

const replyComment = async function (req, res) {
  try {
    let commentId = req.params.commentId;

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid Object id " });
    }
    const data = req.body;
    const { name, content } = data;
    commentId = data.commentId = commentId;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          message: "please provide something to comment",
        });
    }

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide your name" });
    }
    if (!content) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide content for your comment",
        });
    }
    let cmntData = await CommentModel.findById(commentId)
    replyingTo = data.replyingTo = cmntData.name

    const saveReplyComment = await ReplyCommentModel.create(data);

    await CommentModel.findByIdAndUpdate(
      { _id:commentId},
      { $set: { replyComment: saveReplyComment._id } }
    );

    res.status(201).send({ status: true, data: saveReplyComment });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};



module.exports = { createComment,replyComment };
