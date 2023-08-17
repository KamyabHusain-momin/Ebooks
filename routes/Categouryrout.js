import express from "express"
import Categoury from "../modal/Categoury.js"
import slugify from "slugify";
const router=express.Router();


router.post("/creatcat", async (req, res, next) => {
    try {
      
  const {name}=req.body;
  if(!name){
    return  res.status(500).send("name is required")
  }
  const exitcat = await Categoury.findOne({name});

  if(exitcat){
    return res.status(501).send("categury is exist")
  }
  const newcat = await new Categoury({name,slug:slugify(name)}).save();
    //   const newcat = new Categoury({
    //     ...req.body,
       
    //   });
  
      //await newcat.save();
    //   res.status(200).send("categoury has been created.");
      res.status(200).send({
        success:true,
        message:"CREAT CAT",
       newcat,
    })} catch (err) {
      next(err);
    }
  })



  router.put("/updatecat/:id",async(req,res,next)=>{
    try{
    const {name}=req.body;
    const {id}=req.params;
    const categury=await Categoury.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

    res.status(200).send({
        success:true,
        message:"update CAT",
        categury

    })
    }
    catch (err) {
        next(err);
      }
  })



  router.get("/getall",async(req,res,next)=>{
    try{
const categoury=await Categoury.find({});
res.status(200).json(categoury)
// send({
//     success:true,
//     message:"all CAT",
//     categoury

// })


    } catch (err) {
        next(err);
      }
  })


router.get("/singelcat/:slug",async(req,res,next)=>{
    const {slug} = req.params
    try{
   const categoury= await Categoury.findOne({slug});
   res.status(200).send({
    success:true,
    message:"singal CAT",
    categoury



    })}


    catch (err) {
        next(err);
      }
})

  router.delete("/deltcat/:id",async(req,res,next)=>{
    try{
        const {id}=req.params;
        await Categoury.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"delete CAT",
            
        
        
        
            })
    }

    catch (err) {
        next(err);
      }
  })
export default router ;