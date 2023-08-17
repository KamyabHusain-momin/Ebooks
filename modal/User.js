import mongoose from "mongoose";



const UserSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    
    },


    email: {
      type: String,
      required:true,
      unique:true
      
      
    },
    
    
    
    
    phone: {
      type: String,
      required:true

    },
    password: {
      type: String,
      unique:true,
      required:true
      
    },
    address:{
        type:String,
        required:true
    },
    anser:{
      type:String,
      required:true
    },
    role:{
        type:Number,
        default:0
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("User",UserSchema)