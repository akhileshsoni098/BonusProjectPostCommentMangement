const express = require("express");

const router = express.Router();

const postContro = require("../controller/postContro");
const commentContro = require("../controller/commentContro");

// ========================== Post requirement here ================
// user can create post
router.post("/createPost", postContro.createPost);
// user can see his post with all comments and comment reply
router.get("/getPost/:postId", postContro.getPost);
// user can update /edit his post
router.put("/updatePost/:postId", postContro.updatePost);
// user can delete his post
router.delete("/deletePost/:postId", postContro.deletePost);

// ===================================== comment requirement ===============================
// users can  comment on post
router.post("/createComment/:postId", commentContro.createComment);
// user can update / edit his comment
router.put("/updateComment/:postId/:commentId", commentContro.updateComment);
// user can delete his comment
router.delete("/deleteComment/:postId/:commentId", commentContro.deleteComment);

//==============================================   comment reply requirement ========================

// user can reply of any comment of any particular post
router.post("/replyComment/:commentId", commentContro.replyComment);
// user can edit his reply of any comment
router.put(
  "/updateReplyComment/:postId/:commentId",
  commentContro.updateReplyComment
);
// user can delete his reply of any comment
router.delete(
  "/deleteReplyComment/:postId/:commentId",
  commentContro.deleteReplyComment
);

// router.get("/", (req,res)=>{
//     res.send({message: "application is running awesome"})
// })

module.exports = router;
