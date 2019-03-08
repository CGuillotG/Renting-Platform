let mongoose = require('mongoose')
let Schema = mongoose.Schema
let passportLocalMongoose = require('passport-local-mongoose')


let userSchema = new Schema({
  username: {
    type:String,
    unique: true,
    required: true
  },
  firstname: {
    type:String,
    required: true
  },
  lastname: {
    type:String,
    required: true
  },
  email: {
    type:String,
    unique: true,
    required: true
  },
  phone: {
    type:String,
    unique: true,
    required: true
  },
  profilePic:{
    type:String,
    default: "https://res.cloudinary.com/cgui1107/image/upload/v1552070261/Weave/ProfilePics/avatar.png"
  },
  ratingLessor:Number,
  ratingLessee:Number,
  address:{},
  payment:{},
  deposit:{},
  isAdmin: {
    type:Boolean,
    default:false
  },
  // prodsLessor: [],
  // prodsLessee: []
},{
  timestamps:true,
  versionKey:false
})


userSchema.plugin(passportLocalMongoose,{usernameField:"email"})

module.exports = mongoose.model('User', userSchema)