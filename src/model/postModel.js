const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId
const postSchema = mongoose.Schema({


name:{type:String,
    required: true
},

title:{type:String,
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

module.exports = mongoose.model("Post", postSchema)





