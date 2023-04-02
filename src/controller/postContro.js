const ReplyCommentModel = require("../model/replyComment");
const PostModel = require("../model/postModel");
const CommentModel = require("../model/comment");
const { isValidObjectId } = require("mongoose");

// ============================================== Post creation =======================

const createPost = async function (req, res) {
  try {
    const data = req.body;
    const { name, title, content } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "please provide something to post" });
    }

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide your name" });
    }
    if (!title) {
      return res.status(400).send({
        status: false,
        message: " Please provide Title of your post ",
      });
    }
    if (!content) {
      return res.status(400).send({
        status: false,
        message: "Please provide content for your post",
      });
    }

    const savePost = await PostModel.create(data);
    res.status(201).send({ status: true, data: savePost });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//================================== get post ======================================================

const getPost = async function (req, res) {
  try {
    const postId = req.params.postId;

    let ExistId = await PostModel.findById(postId);

    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: "post id doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invailed post id" });
    }

    const PostDetails = await PostModel.findOne({
      _id: postId,
      isDeleted: false,
    }).select({
      name: 1,
      content: 1,
      title: 1,
      createdAt: 1,
    });
    if (!PostDetails) {
      return res.status(400).send({ status: false, message: "Invailed entry" });
    }
    const commentData = await CommentModel.find({
      post: postId,
      isDeleted: false,
    })
      .select({ _id: 0, name: 1, content: 1, createdAt: 1 })
      .populate({
        path: "replyComment",
        model: "ReplyComment",
        select: { _id: 0, replyingTo: 1, name: 1, content: 1, createdAt: 1 },
      });

    let data = {
      PostDetails: PostDetails,
      comment: commentData,
    };

    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// ============================================ update post ===================================

const updatePost = async function (req, res) {
  try {
    const postId = req.params.postId;

    let ExistId = await PostModel.findById(postId);

    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: "post id doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invailed post id" });
    }

    const data = req.body;
    const { name, title, content } = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "please provide some field to update",
      });
    }

    if (name) {
      if (!data.name)
        return res
          .status(400)
          .send({ status: false, message: "Please Provide your name" });
    }
    if (title) {
      if (!data.title)
        return res.status(400).send({
          status: false,
          message: " Please provide Title of your post ",
        });
    }
    if (content) {
      if (!data.content)
        return res.status(400).send({
          status: false,
          message: "Please provide content for your post",
        });
    }

    const upPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $set: { name: data.name, title: data.title, content: data.content } },
      { new: true }
    );
    res.status(201).send({ status: true, data: upPost });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// ============================== delete Post ===================================================

const deletePost = async function (req, res) {
  try {
    const postId = req.params.postId;

    let ExistId = await PostModel.findById(postId);

    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: "post id doesn't exist" });
    }

    if (!isValidObjectId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invailed post id" });
    }

    await PostModel.findByIdAndUpdate(
      { _id: postId, isDeleted: false },
      { isDeleted: true }
    );

    res.status(200).send({ status: true, message: "successfully deleted" });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createPost, getPost, updatePost, deletePost };




// populate related material ..... this is One of the new thing what i learn in this project
/* 
.find(query).select({'advtId': 0})
   .populate({
      path: 'influId',
      model: 'influencer',
      select: { '_id': 1,'user':1},
      populate: {
        path: 'userid',
        model: 'User'
      }
   })
 .populate('campaignId',{'campaignTitle':1})
 .exec(callback);
*/
