import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/register", userCtrl.registerUser);
userRoutes.post("/login", userCtrl.loginUser);
userRoutes.put("/approveuea/:id", userCtrl.approvedUEAs);

export default userRoutes;
