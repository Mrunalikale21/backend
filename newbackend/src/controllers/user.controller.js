import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { response } from "express";

const generateAccessAndRefreshToken = async(userId) => {
  try{
    const user = await User.findById(userId)
    const acessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})
    
    return {acessToken, refreshToken}


  }catch(error){
       throw new ApiError(500, "somthing went wrong while generating refresh and acess token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  
  //get user detailes from frontend
  //validation-not empty
  //check if user already exists: username, email
  //check for images, check for avatar
  //upload them to cloudinary, avatar
  //create user object- create entry in db
  //remove password and refresh token field from response
  //check for user creation 
  //return response
  

  const {fullName, email, username, password} = req.body
  // console.log("email:", email);
 
  if(
   [fullName, email, username, password].some((field) => field?.trim() === "")
   ){
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if(existedUser){
    throw new ApiError(409, "User with email or username already exists")
  }
  // console.log(req.files)

const avatarLocalPath = req.files?.avatar[0]?.path;
 //const coverImageLocalPath = req.files?.coverImage[0]?.path;  //optional chaining
let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
coverImageLocalPath = req.files.coverImage[0]?.path;
}

 if(!avatarLocalPath){
  throw new ApiError(400, "Avatar file is required")
 }

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
  throw new ApiError(400, "Avatar file is required")
 }

const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
)
//select will select all the fields so we subtract the fields from it


if(!createdUser){
  throw new ApiError(500, "something went wrong while registring a user")
}

return res.status(201).json(
  new ApiResponse(200, createdUser, "User registered successfully")
)

})

const loginUser = asyncHandler(async(req,res) => {
      //req boy -> data laao
      //username or email
      //find the user
      //password check
      //access and refresh token generate 
      //send cookie

      const {email, username, password} = req.body

      if(!username || !email){
        throw new ApiError(400, "username or password is required")
      }

     const user = await  User.findOne({
        $or: [{username}, {email}]
      })

      if(!user){
        throw new ApiError(404, "User does not exists")
      }

      const isPasswordValid = await user.isPasswordCorrect(password)

      if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
      }

      const {acessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

      const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

      const options = {
        httpOnly: true,
        secure : true
      }

      return res
      .status(200)
      .cookie("acessToken", acessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser, acessToken, refreshToken
          },
          "User logged in sucessfully"
        )
      )
})

const logoutUser = asyncHandler(async(req, res) => {
   await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined
        }
      },
      {
        new: true
      }
    )

    const options = {
      httpOnly: true,
      secure : true
    }

    return res
    .status(200)
    .clearCokkie("acessToken", options)
    .clearCokkie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))

})

export {
  registerUser,
  loginUser,
  logoutUser
}