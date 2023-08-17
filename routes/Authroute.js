import express from "express";
import jwt from "jsonwebtoken";
import {createError} from "../error.js";
import User from "../modal/User.js";
import bcrypt from "bcrypt";
const router = express.Router();
import {isAdmin, verify} from "../verifytoken.js"
router.post("/register", async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password,salt);
  
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User has been created.");
    } catch (err) {
      next(err);
    }
  })
router.post("/login", async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));
  
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT
      );

      res.status(200).send({
        success:true,
        message:"login",
        user:{
            name:user.name,
            role:user.role,
            phone:user.phone,
            password:user.password,
            email:user.email,
            anser:user.anser,
            

        },
        token,
      })
  
    //   const { password, ...otherDetails} = user._doc;
    //   res.cookie("access_token", token, {
    //       httpOnly: true,
    //     })
    //     .status(200)
    //     .json({ details: { ...otherDetails } });
    } catch (err) {
      next(err);
    }
  })
// router.get("/test",verify,isAdmin,(req,res)=>{
//     try{
//         res.send("protected")
//     }catch (err) {
//         next(err);
//       }
// })
router.get("/",  async (req,res,next)=>{
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/forgetpassword/f",async(req,res,next)=>{
try{
const {name,newpassword,anser}=req.body
if(!name){
  res.status(400).send("name required.");
}
if(!anser){
  res.status(400).send("anser required.");
}

if(!newpassword){
  res.status(400).send("newpassword required.");
}

const user = await User.findOne({name,anser})
console.log(user)
if(!user){
  res.status(400).send("email or anser not match");

}
//console.log(user)
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.newpassword,salt)
console.log(hash)
  await User.findByIdAndUpdate(user._id,{password:hash})
  res.status(200).json(user)

}

  catch (err) {
    next(err);
  }

})

export default router;