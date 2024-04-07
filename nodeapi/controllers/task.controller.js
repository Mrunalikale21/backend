import {Task} from "../models/task.model.js"

export const newTask = async (req,res) => {
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

  export const getMyTask = async (req,res) => {
    const userid = req.user._id;

    const tasks = await Task.find({user: userid})

    res.status(200).json({
      success: true,
      tasks,
    })
  }

  export const updateTask = async (req,res) => {
    const task = await Task.findById( req.params.id);

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "task updated",
    })
  }

  export const deleteTask = async (req,res) => {
    const task = await Task.findById( req.params.id);

    if(!task) 
    return res.status(404).json({
  success: false,
 message: "Invalid id",
})
  
await task.deleteOne();

    await task.remove();
    res.status(200).json({
      success: true,
      message: "task deleted",
    })
  }