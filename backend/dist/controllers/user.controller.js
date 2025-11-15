"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, password, firstname, middlename, lastname, dateofbirth, email, phoneNumber, } = req.body;
    if (!(userid === null || userid === void 0 ? void 0 : userid.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        res.status(400).json({ message: "Missing username or password!" });
        return;
    }
    const isSuccess = yield user_model_1.default.create({
        userid,
        password,
        firstname,
        middlename,
        lastname,
        dateofbirth,
        email,
        phoneNumber,
    });
    if (!isSuccess) {
        res.status(409).json({ message: "Username is already taken!" });
        return;
    }
    res.status(201).json({ message: "User successfully added!" });
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, password, firstName, lastName } = req.body;
    //console.log("req.body", req.body);
    if (!(userid === null || userid === void 0 ? void 0 : userid.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        res.status(400).json({ message: "Username or password is empty!" });
        return;
    }
    const user = yield user_model_1.default.login({ userid, password });
    if (!user) {
        res.status(401).json({ message: "Incorrect username or password!" });
    }
    const fullName = firstName + " " + lastName;
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.fullName = fullName;
        req.session.userid = userid;
    }
    res.status(200).json({
        message: "Login successful!",
        redirectTo: "/dashboard",
    });
});
const logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to logout" });
            }
            res.status(200).json({
                message: "Logout successful",
                redirectTo: "/",
            });
        });
    }
    else {
        res.status(200).json({
            message: "Logout successful",
            redirectTo: "/",
        });
    }
};
/*
const getCurrentUser = (req: Request, res: Response) => {
  if (!req.session?.isLoggedIn || !req.session.userid) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user = userModel.findByUsername(req.session.userid);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...userData } = user;
  res.status(200).json({ data: userData });
};
*/
const getCurrentUser = (req, res) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLoggedIn) || !req.session.userid) {
        console.log("Result: 401 Not logged in");
        return res.status(401).json({ message: "Not logged in" });
    }
    const user = user_model_1.default.findByUsername(req.session.userid);
    if (!user) {
        console.log("Result: 404 User not found (userModel returned null/false)");
        req.session.destroy(() => { });
        return res.status(404).json({ message: "User not found" });
    }
    if (typeof user !== "object" || user === null) {
        console.log("Result: 500 Invalid user object type");
        return res
            .status(500)
            .json({ message: "Internal server error: Invalid user data" });
    }
    const { password } = user, userData = __rest(user, ["password"]);
    res.status(200).json({ data: userData });
};
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.body;
    let newPassword = "1234";
    if (!userid)
        return res.status(400).json({ message: "Missing userid or newPassword" });
    const user = user_model_1.default.findByUsername(userid);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
    user.password = hashedPassword;
    res.status(200).json({ message: "Password reset successfully" });
});
exports.default = {
    addUser,
    loginUser,
    logout,
    resetPassword,
    getCurrentUser,
};
