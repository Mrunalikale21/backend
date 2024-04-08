import express from "express"
import {getMyProfile, login, logout, register, } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

// router.get("/userid/special", specialFunch)

// router.route("/userid/:id").get(getMyDetails).put(updateUser).delete(delteUser)
 

export default router;