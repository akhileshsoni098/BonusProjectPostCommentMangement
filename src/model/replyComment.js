const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId
const replyComment = mongoose.Schema({

// to do comment me post id lenge aur us id pr comment krenge aur comment oo post id daal denge 
// isse kya hoga ki jb post dekha jayega toh hm ek db call krenge us particular post ke commnt ke liye 

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
}

})


module.exports = mongoose.model("ReplyComment", replyComment)
