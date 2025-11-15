"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
//import { checkLogin, checkLogout } from "../middleware/auth.middleware";
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_controller_1.default.addUser);
userRouter.post("/login", user_controller_1.default.loginUser);
userRouter.get("/logout", user_controller_1.default.logout);
userRouter.get("/me", user_controller_1.default.getCurrentUser);
userRouter.post("/reset-password", user_controller_1.default.resetPassword);
exports.default = userRouter;
