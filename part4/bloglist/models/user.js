const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

userSchema = mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:true,
    minLength:3
  },
  name:{
    type:String,
    required:true,

  },
  blogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Blog'
    }
  ],
  passwordHash:String
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: (doc, ret) => {
    delete ret._id 
    delete ret.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User',userSchema)

module.exports = User