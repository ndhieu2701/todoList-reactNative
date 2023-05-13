import Task from "../model/Task.js";

//[GET] /tasks/:userID
const getAllTasks = async (req, res) => {
  try {
    const { userID } = req.params;
    const tasks = await Task.find({ user: userID }).populate("user");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[POST] /tasks/
const createTask = async (req, res) => {
  try {
    const { userID, content, status, title } = req.body;
    const newTask = await Task.create({
      user: userID,
      content,
      status,
      title
    });
    const taskRes = await newTask.populate("user")
    res.status(201).json(taskRes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[PUT] /tasks/:id
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, status, title } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      {
        content,
        status,
        title
      },
      { new: true }
    ).populate("user");
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[DELETE] /tasks/:id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { getAllTasks, createTask, updateTask, deleteTask };
