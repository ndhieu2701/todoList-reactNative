import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/tasksController.js";
const router = express.Router();

router.get("/:userID", verifyToken, getAllTasks);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
