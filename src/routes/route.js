const express = require("express")

const router = express.Router()

const postContro = require("../controller/postContro")
const commentContro = require("../controller/commentContro")



router.post("/createPost", postContro.createPost)
router.post("/createComment/:postId", commentContro.createComment)
router.post("/replyComment/:commentId", commentContro.replyComment)
router.get("/getPost/:postId", postContro.getPost)
router.put("/updatePost/:postId", postContro.updatePost)
router.delete("/deletePost/:postId", postContro.deletePost )
// router.get("/", (req,res)=>{
//     res.send({message: "application is running awesome"})
// })

module.exports = router

