import { Router } from "express";
import userController from "../controllers/user.controller";
//import { checkLogin, checkLogout } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logout);

userRouter.get("/me", userController.getCurrentUser);

userRouter.post("/reset-password", userController.resetPassword);

export default userRouter;
