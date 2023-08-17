import mongoose from "mongoose";



const ProductSchema = new mongoose.Schema(
    {
      name:{
        type:String,
        required:true,
        trim:true
      
      },
  slug:{
    type: String,
    required:true
  },
  
     decription: {
        type: String,
        required:true
      
        
        
      },
      
      
      
      
      price: {
        type: Number,
        required:true
  
      },
      quntity: {
        type: Number,
        required:true
  
      },

      categoury:{
        type:mongoose.ObjectId,
        ref:"Categoury",
        required:true
      },
     
       photo:{
        
       data:Buffer,
      contentType:String,
      //  required:true
       },
      shipping:{
        type:Boolean
      }
      
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Product",ProductSchema)