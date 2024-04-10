import ErrorHandler from "../middlewares/error.middleware.js";
import {Task} from "../models/task.model.js"


export const newTask = async (req,res) => {
  try {
     const {title, description} = req.body;
  
    await Task.create({
      title,
      description,
      user: req.user,
    })
  
    res.status(201).json({
      success: true,
      message: "Task added succesfully"
    })
    }
   catch (error) {
    next(error);
  }
}

  export const getMyTask = async (req,res) => {
   try {
     const userid = req.user._id;
 
     const tasks = await Task.find({user: userid})
 
     res.status(200).json({
       success: true,
       tasks,
     })
   } catch (error) {
    next(error)
   }
  }

  export const updateTask = async (req,res) => {
    try {
      const task = await Task.findById( req.params.id);
  
      if(!task) return next(new ErrorHandler("Task not found", 404))
      
  
      task.isCompleted = !task.isCompleted;
      await task.save();
      res.status(200).json({
        success: true,
        message: "task updated",
      })
    } catch (error) {
      next(error)
    }
  }

  export const deleteTask = async (req,res) => {
    try {
      const task = await Task.findById( req.params.id);
  
      if(!task) return next(new ErrorHandler("Invalid id", 404))
      
      await task.deleteOne();
  
      
      res.status(200).json({
        success: true,
        message: "task deleted",
      })
    } catch (error) {
      next(error)
    }
  }