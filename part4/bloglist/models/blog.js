const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  url: {
    type:String,
    required:true
  },
  likes: {
    type:Number,
    default:0
  }
})

blogSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: (doc, ret) => {
    delete ret._id 
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog