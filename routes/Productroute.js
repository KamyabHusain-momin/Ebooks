import express from "express"
import Product from "../modal/Product.js";
import Categoury from "../modal/Categoury.js"
import formidable from "express-formidable";
import slugify from "slugify";
import fs from "fs";
//import { populate } from "dotenv";
//import multer from "multer";
const router=express.Router();



router.post("/creatproduct",formidable(), async (req, res, next) => {
    try {
        const {name,slug,decription,price,quntity,categoury,shipping}=req.fields;
      const{photo}=req.files
  //const {name}=req.body;
 // cconsole .log(photo)
  if(!name){
    return  res.status(500).send("name is required")
  }
 
  const product =  new Product({...req.fields,slug:slugify(name)})


if(photo){
    product.photo.data=fs.readFileSync(photo.path)
    product.photo.contentType=photo.type
}
//console.log(product);
await product.save();
console.log(product)
    //   res.status(200).send("categoury has been created.");
      res.status(200).send({
        success:true,
        message:"CREAT procuct",
       product,
    })} catch (err) {
      next(err);
    }
  })



  router.put("/updateproduct/:id",formidable(),async(req,res,next)=>{
    try{
      const {id}=req.params;
      const {name,slug,decription,price,quntity,categoury,shipping}=req.fields;
      //const{photo}=req.files;
    
    const categury=await Product.findByIdAndUpdate(id,{...req.fields,slug:slugify(name)},{new:true})

    res.status(200).send({
        success:true,
        message:"PRODUCT UPDATE",
        categury

    })
    }
    catch (err) {
        next(err);
      }
  })



  router.get("/getallproduct",async(req,res,next)=>{
    try{
const categoury=await Product.find({})
// (await Product.find({})).populate("categoury").select("-photo").limit(10).sort({createdAt:-1});
res.status(200).json(categoury);
// send({
//     success:true,
//     message:"all PRODUCT",
//     categoury

}
  catch (err) {
        next(err);
      }
  })
//filter

router.get("/product-filters",async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  }
   catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
});

router.get("/singelproduct/:slug",async(req,res,next)=>{
    const {slug} = req.params
    try{
   const categoury= await Product.findOne({slug}).select("-photo").populate("categoury");
   res.status(200).send({
    success:true,
    message:"singal PRODUCT",
    categoury



    })}


    catch (err) {
        next(err);
      }
})

  router.delete("/deltproduct/:pid",async(req,res,next)=>{
    try{
        const {pid}=req.params;
        await Product.findByIdAndDelete(pid).select("-photo");
        res.status(200).send({
            success:true,
            message:"delete PRODUCT",
            
        
        
        
            })
    }

    catch (err) {
        next(err);
      }
  })



  router.get("/getphoto/:pid",async(req,res,next)=>{
    try{
   
      const product=await Product.findById(req.params.pid).select("photo")
     
        if (product.photo.data){
          res.set("content-type",product.photo.contentType);
          return res.status(200).send(product.photo.data)
        }


   
      }
    catch (err) {
      next(err);
    }
  })


  //get all pic 
  router.get("/getallphoto/photo",async(req,res,next)=>{
    try{
      //const {pid}=req.params;
      const product=await Product.find({}).select("photo")
      //console.log(product)
         //if (product.photo.data){
          // res.set("content-type",product.photo.contentType);
          return res.status(200).send(product.photo.data)
        // }

        // res.status(200).send({
        //   success:true,
        //   message:"delete PRODUCT",
          
      
      
      
        //   })
   
      }
    catch (err) {
      next(err);
    }
  })



  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads/')
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + '-' + file.originalname)
  //   }
  // });
  
  // const upload = multer({ storage: storage });

  // router.post('create/kk', upload.single('image'), async (req, res) => {
  //   try {
  //     const { name, age } = req.body;
  //     const { path } = req.file;
  //     const user = new Product({ name, age, image: path });
  //     await user.save();
  //     res.status(200).json({ message: 'User created successfully' });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });
export default router ;