const mongoose = require("mongoose")
const replyComment = require("./replyComment")
let ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = mongoose.Schema({

name:{type:String,
    required: true
},
content:{type:String, 
required: true 
},

createdAt:{type: Date, 
    default: Date.now
},
post:{
    type:ObjectId,
    ref:"Post"
},
replyComment:{
    type:ObjectId,
    ref:"ReplyComment"
}
})


module.exports = mongoose.model("Comment", commentSchema)
