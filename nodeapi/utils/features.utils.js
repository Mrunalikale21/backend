import jwt from "jsonwebtoken"

export const sendCookie = (user,res,message, statusCode=200) => {
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

   res.status(statusCode)
   .cookie("token",
   token , {
    httpOnly : true,
    maxAge: 15 * 60 * 100,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",  //coz fronted and backend url may be different
    secure: process.env.NODE_ENV === "Development" ? false : true,
   })
   .json({
    success: true,
    message,
   })
}