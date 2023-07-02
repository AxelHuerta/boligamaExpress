import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/register", userCtrl.registerUser);

export default userRoutes;
