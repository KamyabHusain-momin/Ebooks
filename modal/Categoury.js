import mongoose from "mongoose";



const CategourySchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    
    },
    slug:{
        type:String,
        lowercase:true,
    }
}
 
);

export default mongoose.model("Categoury",CategourySchema)