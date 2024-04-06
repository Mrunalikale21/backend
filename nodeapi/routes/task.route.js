import express from "express"
import { getMyTask, newTask } from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask)

router.get("/my", isAuthenticated, getMyTask)

export default router;