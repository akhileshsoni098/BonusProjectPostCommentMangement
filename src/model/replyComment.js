const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId
const replyComment = mongoose.Schema({

replyingTo:{type:String},
name:{type:String,
    required: true
},
content:{type:String, 
required: true 
},

createdAt:{type: Date, 
    default: Date.now
},
commentId:{
    type:ObjectId,
    ref:"Comment"
},
isDeleted:{
    type:Boolean,
    default:false
}

})


module.exports = mongoose.model("ReplyComment", replyComment)



