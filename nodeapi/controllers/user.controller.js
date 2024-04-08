import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.utils.js";
import ErrorHandler from "../middlewares/error.middleware.js";



export const login = async(req,res) => {
  try {
    const {email,password} = req.body;
  
    const user = await User.findOne({email}).select("+password");
  
    if(!user) return next(new ErrorHandler("Invalid email or password", 400))
  
     const isMatch = await bcrypt.compare(password, user.password)
  
     if(!isMatch) return next(new ErrorHandler("Invalid email or password", 400))
  
     sendCookie(user,res, `Welcom back, ${user.name}`, 200)
  
  } catch (error) {
    next(error)
  }
};

export const register = async(req,res) => {
  try {
     const {name, email, password} = req.body;
  
     let user = await User.findOne({email});
  
     if(user) return next(new ErrorHandler("IUser already exists", 400))
  
     const hassedPassword = await bcrypt.hash(password, 10);
  
     user = await User.create({
      name,
      email, 
      password: hassedPassword
    })
  
     sendCookie(user,res, "Registered succesfully", 201)
  } catch (error) {
    next(error)
  }
};

export const getMyProfile = async (req,res) => {
  
   res.status(200).json({
    success: true,
    user: req.user,
  })
};

export const logout = (req,res) => {
  res
  .status(200)
  .cookie("token", {expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
})
  .json({
    success: true,
    user: req.user,
  })
}





































// export const getALlUsers =  async(req,res) => {

//   const users = await User.find({})
//  console.log(req.query)
// const keyword = req.query.keyword;
 
//    res.json({
//      success: true,
//      users,
//    })
//  }

//  export const register = async(req,res) => {
//   const {name,email, password} = req.body;
//   await User.create({
//     name,
//     email,
//     password
//    })
//     res.status(201).json({
//       success: true,
//       message: "registered succesfully"
//     })
//   }


//   export const getUserDetails = async(req,res) => {
//     const {id} = req.params;
//     const user = await User.findById(id);
//   console.log(req.params)
//     res.status(200)
//     .json({
//       success: true,
//       user,
//     })
//   }

  // export const specialFunch = (req,res) => {
  //   res.json({
  //     success: true,
  //     message: "just joking"
  //   })
  // }


  // export const updateUser = async(req,res) => {
  //   const {id} = req.params;
  //   const user = await User.findById(id);
  // console.log(req.params)
  //   res.status(200)
  //   .json({
  //     success: true,
  //     message: "Updated"
  //   })
  // }
  // export const delteUser = async(req,res) => {
  //   const {id} = req.params;
  //   const user = await User.findById(id);
  // console.log(req.params)
  //   res.status(200)
  //   .json({
  //     success: true,
  //     message: "Deleted"
  //   })
  // }