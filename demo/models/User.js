const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Username Should be longer than 5 characters"],
  },
  password: {
    type: String,
    required: true,
  },
  
},{ timestamps: true })

module.exports = mongoose.model('User',userSchema)
