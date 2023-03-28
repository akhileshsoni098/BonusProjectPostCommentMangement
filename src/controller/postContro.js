const ReplyCommentModel = require("../model/replyComment");
const PostModel = require("../model/postModel");
const CommentModel = require("../model/comment");

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
    // confusion h abhi isme ki agr ek se jada user ne comment kiya toh kya hoga
    const PostDetails = await PostModel.findById(postId).select({
      name: 1,
      content: 1,
      title: 1,
      createdAt: 1,
    });
    const commentData = await CommentModel.find({ post: postId })
      .select({ _id: 0, name: 1, content: 1, createdAt: 1 })
      .populate({ path: 'replyComment',
      model: 'ReplyComment',
      select: { _id: 0, replyingTo: 1, name: 1, content: 1, createdAt: 1 }});

    // const replyComment = await ReplyCommentModel.findById(commentId).select({name:1,content:1,createdAt:1})
    let data = {
      PostDetails: PostDetails,
      comment: commentData,
    };

    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createPost, getPost };






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