


// import jwt from "jsonwebtoken"
// import User from "./modal/User";
// export function verify(req, res, next) {
//         const authHeader = req.headers.token;
//        if (authHeader) {
//           const token = authHeader.split(" ")[1];
      
//           jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//             if (err) res.status(403).json("Token is not valid!");
//             req.user = user;
//             next();
//           });
//         } else {
//           return res.status(401).json("You are not authenticated!");
//         }
//       }


// export const  isadmin(req,res,next)=>{
//   try{
// const user =await User.findById(req.user._id)
// if()
//   }
// }
//   const 
// } 

import JWT from "jsonwebtoken";
//import userModel from "../models/userModel.js";
import User from "./modal/User.js";

//Protected Routes token base
export const  verify = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};