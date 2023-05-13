import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {login, register, updateUser} from "../controller/userController.js"

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/update/:id", verifyToken, updateUser);

export default router;
