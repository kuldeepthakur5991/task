const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{ 
type:String,
required:true
  }
  
})

// export default mongoose.model("users",userShcema)
module.exports = mongoose.model('User', userSchema); // Changed to module.exports
