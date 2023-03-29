const { isValidObjectId } = require("mongoose");
const ReplyCommentModel = require("../model/replyComment");
const PostModel = require("../model/postModel");
const CommentModel = require("../model/comment");


// ========================== comment requirement ===================================


// =============================== creating comment ===================================================

const createComment = async function (req, res) {
  try {
    let postId = req.params.postId;
    let ExistId = await PostModel.findById(postId);

    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: " id doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid Object id " });
    }
    const data = req.body;
    const { name, content } = data;
    post = data.post = postId;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
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
      return res.status(400).send({
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

//================================================== update comment ==================================
const updateComment = async function (req, res) {
  try {
    let postId = req.params.postId;
    // post id in the params
    let ExistId = await PostModel.findOne({ _id: postId, isDeleted: false });
    console.log(ExistId);
    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: " post doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid post id " });
    }

    // ================== comment id in the params ================

    let commentId = req.params.commentId;

    let ExistCmntId = await CommentModel.findOne({
      _id: commentId,
      isDeleted: false,
    });
    if (!ExistCmntId) {
      return res
        .status(404)
        .send({ status: false, message: "  invailed entry" });
    }

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid comment id " });
    }

    // ============ taking data in body =====

    const data = req.body;
    const { name, content } = data;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "please provide any field to update",
      });
    }

    if (name) {
      if (!data.name)
        return res
          .status(400)
          .send({ status: false, message: "Please Provide your name" });
    }
    if (content) {
      if (!data.content)
        return res.status(400).send({
          status: false,
          message: "Please provide content for your comment",
        });
    }

    const updteComment = await CommentModel.findOneAndUpdate(
      { _id: commentId, isDeleted: false },
      { $set: { name: data.name, content: data.content } },
      { new: true }
    );

    if (!updteComment) {
      return res
        .status(404)
        .send({ status: false, messaage: "comment not found" });
    }

    res.status(200).send({ status: true, data: updteComment });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// ================================= delete comment ==========================================

const deleteComment = async function (req, res) {
  try {
    let postId = req.params.postId;
    // post id in the params
    let ExistId = await PostModel.findOne({ _id: postId, isDeleted: false });
    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: " post doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid post id " });
    }

    // ================== comment id in the params ================

    let commentId = req.params.commentId;

    let ExistCmntId = await CommentModel.findOne({
      _id: commentId,
      isDeleted: false,
    });
    if (!ExistCmntId) {
      return res
        .status(404)
        .send({ status: false, message: "  invailed entry" });
    }

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid comment id " });
    }
    //====================== delete =======================

    await CommentModel.findOneAndUpdate(
      { _id: commentId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    res.status(302).send({ status: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};



// =========================== comment Reply requirement start from here ================================




//================================================  creating reply comment ===============================

const replyComment = async function (req, res) {
  try {
    let commentId = req.params.commentId;

    let existCmnt = await CommentModel.findById(commentId);
    if (!existCmnt) {
      return res
        .status(404)
        .send({ status: false, message: "comment id not exsist" });
    }
    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid Object id " });
    }
    const data = req.body;
    const { name, content } = data;
    commentId = data.commentId = commentId;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
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
      return res.status(400).send({
        status: false,
        message: "Please provide content for your comment",
      });
    }
    let cmntData = await CommentModel.findById(commentId);
    replyingTo = data.replyingTo = cmntData.name;

    const saveReplyComment = await ReplyCommentModel.create(data);

    await CommentModel.findByIdAndUpdate(
      { _id: commentId },
      { $set: { replyComment: saveReplyComment._id } }
    );

    res.status(201).send({ status: true, data: saveReplyComment });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//=========================================================== update reply comment ============

const updateReplyComment = async function (req, res) {
  try {
    let postId = req.params.postId;
    // post id in the params
    let ExistId = await PostModel.findOne({ _id: postId, isDeleted: false });
    console.log(ExistId);
    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: " post doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid post id " });
    }

    // ================== comment id in the params ================

    let commentId = req.params.commentId;

    let ExistCmntId = await CommentModel.findOne({
      _id: commentId,
      isDeleted: false,
    });
    if (!ExistCmntId) {
      return res
        .status(404)
        .send({ status: false, message: "  invailed entry" });
    }

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid comment id " });
    }

    // ============ taking data in body =====

    const data = req.body;
    const { name, content } = data;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "please provide any field to update",
      });
    }
    // name depends that i can make it unchageable but for now it's okk
    if (name) {
      if (!data.name)
        return res
          .status(400)
          .send({ status: false, message: "Please Provide your name" });
    }
    if (content) {
      if (!data.content)
        return res.status(400).send({
          status: false,
          message: "Please provide content for your comment",
        });
    }

    const updteRComment = await ReplyCommentModel.findOneAndUpdate(
      { _id: ExistCmntId.replyComment },
      { $set: { name: data.name, content: data.content } },
      { new: true }
    );
    if (!updteRComment) {
      return res
        .status(400)
        .send({ status: false, message: "nothing to update" });
    }
    res.status(200).send({ status: true, data: updteRComment });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// ================================== delete Reply comment =======================================

const deleteReplyComment = async function (req, res) {
  try {
    let postId = req.params.postId;
    // post id in the params
    let ExistId = await PostModel.findOne({ _id: postId, isDeleted: false });
    console.log(ExistId);
    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: " post doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid post id " });
    }

    // ================== comment id in the params ================

    let commentId = req.params.commentId;

    let ExistCmntId = await CommentModel.findOne({
      _id: commentId,
      isDeleted: false,
    });
    if (!ExistCmntId) {
      return res
        .status(404)
        .send({ status: false, message: "  invailed entry" });
    }

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid comment id " });
    }

    // delete
    await ReplyCommentModel.findOneAndDelete(
      { _id: ExistCmntId.replyComment },
      { new: true }
    );

    res
      .status(200)
      .send({ status: true, message: "Reply deleted successfully" });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createComment,
  replyComment,
  updateComment,
  deleteComment,
  updateReplyComment,
  deleteReplyComment,
};
