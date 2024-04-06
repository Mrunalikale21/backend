import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.utils.js";


export const getALlUsers = async(req,res) => {};


export const login = async(req,res) => {
  const {email,password} = req.body;

  const user = await User.findOne({email}).select("+password");

  if(!user) return res.status(404).json({
    sucess: false,
    message:"Invalid email or password"
   })

   const isMatch = await bcrypt.compare(password, user.password)

   if(!isMatch) return res.status(404).json({
    sucess: false,
    message:"Invalid email or password"
   })

   sendCookie(user,res, `Welcom back, ${user.name}`, 200)

};

export const register = async(req,res) => {
   const {name, email, password} = req.body;

   let user = await User.findOne({email});

   if(user) return res.status(400).json({
    sucess: false,
    message:"User already exists"
   })

   const hassedPassword = await bcrypt.hash(password, 10);

   user = await User.create({
    name,
    email, 
    password: hassedPassword
  })

   sendCookie(user,res, "Registered succesfully", 201)
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
  .cookie("token", {expires: new Date(Date.now())})
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