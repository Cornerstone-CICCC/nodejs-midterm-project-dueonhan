import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import bcrypt from "bcrypt";

const addUser = async (
  req: Request<{}, {}, Omit<User, "id">>,
  res: Response
) => {
  const {
    userid,
    password,
    firstname,
    middlename,
    lastname,
    dateofbirth,
    email,
    phoneNumber,
  } = req.body;

  if (!userid?.trim() || !password?.trim()) {
    res.status(400).json({ message: "Missing username or password!" });
    return;
  }

  const isSuccess = await userModel.create({
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
};

const loginUser = async (
  req: Request<
    {},
    {},
    { userid: string; password: string; firstName: String; lastName: String }
  >,
  res: Response
) => {
  const { userid, password, firstName, lastName } = req.body;
  //console.log("req.body", req.body);

  if (!userid?.trim() || !password?.trim()) {
    res.status(400).json({ message: "Username or password is empty!" });
    return;
  }

  const user = await userModel.login({ userid, password });
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
};

const logout = (req: Request, res: Response) => {
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
  } else {
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

const getCurrentUser = (req: Request, res: Response) => {
  if (!req.session?.isLoggedIn || !req.session.userid) {
    console.log("Result: 401 Not logged in");
    return res.status(401).json({ message: "Not logged in" });
  }

  const user = userModel.findByUsername(req.session.userid);

  if (!user) {
    console.log("Result: 404 User not found (userModel returned null/false)");
    req.session.destroy(() => {});
    return res.status(404).json({ message: "User not found" });
  }

  if (typeof user !== "object" || user === null) {
    console.log("Result: 500 Invalid user object type");
    return res
      .status(500)
      .json({ message: "Internal server error: Invalid user data" });
  }

  const { password, ...userData } = user;
  res.status(200).json({ data: userData });
};

const resetPassword = async (req: Request, res: Response) => {
  const { userid } = req.body;
  let newPassword = "1234";

  if (!userid)
    return res.status(400).json({ message: "Missing userid or newPassword" });

  const user = userModel.findByUsername(userid);
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;

  res.status(200).json({ message: "Password reset successfully" });
};

export default {
  addUser,
  loginUser,
  logout,
  resetPassword,
  getCurrentUser,
};
