const ReplyCommentModel = require("../model/replyComment") 
const PostModel = require("../model/postModel");
const CommentModel = require("../model/comment");



const createPost = async function(req, res){
    try{
    const data = req.body
    const {name,title,content} = data

if(Object.keys(data).length ==0){return res.status(400).send({status:false , message:"please provide something to post"})}

if(!name){return res.status(400).send({status:false , message:"Please Provide your name" })}
if(!title){return res.status(400).send({status:false , message:" Please provide Title of your post " })}
if(!content){return res.status(400).send({status:false , message:"Please provide content for your post" })}

const savePost = await PostModel.create(data)
res.status(201).send({status:true , data:savePost})

    }catch(err){
        res.status(500).send({status:false , message:err.message})
    }
}

//================================== get post ======================================================


const getPost = async function(req,res){
    try{
    const postId = req.params.postId
// confusion h abhi isme ki agr ek se jada user ne comment kiya toh kya hoga 
    const PostDetails = await PostModel.findById(postId)
    const commentData = await CommentModel.findById(PostDetails.commentId)
    const replyComment = await ReplyCommentModel.findById(commentData.replyComment)
let data = {
PostDetails:{
    name:PostDetails.name,
    title:PostDetails.title,
    content:PostDetails.content,
    createdAt:PostDetails.createdAt
},
comment:[
   { 
    name:commentData.name,
    content:commentData.content,
    createdAt:commentData.createdAt
},{
    name:replyComment.name,
    RepliedTo:replyComment.replyingTo,
    content:replyComment.content,
    createdAt:replyComment.createdAt
}
]
}

    res.status(200).send({status:true, data:data})
}catch(err){
    res.status(500).send({status:false , message:err.message})
}
}


module.exports = { createPost,getPost  }










