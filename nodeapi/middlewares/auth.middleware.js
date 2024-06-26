import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req,res,next) => {
  
  const { token } = req.cookies;
  
  if(!token)
  return res.status(400).json({
    sucess: false,
    message:"Login first"
   })

   const decoded = jwt.verify(token,
     process.env.JWT_SECRET)

     req.user = await User.findById(decoded._id);
     next();
}