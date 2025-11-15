import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import * as dotenv from "dotenv";
import session = require("express-session");

dotenv.config();
import userRouter from "./routes/user.routes";
import employeeRouter from "./routes/employee.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, firstname: "Dueon", lastname: "Han", role: "Admin" },
  { id: 2, firstname: "Jane", lastname: "Doe", role: "User" },
];

app.use(
  cors({
    origin: "http://localhost:4321",
    credentials: true,
  })
);

app.get("/users/me", (req, res) => {
  // 예시: 세션 또는 쿠키에서 userId 가져오기
  const userId = 1; // 실제는 세션/쿠키에서 가져와야 함
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ data: user });
});

if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
  throw new Error("Missing cookie keys!");
}
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [process.env.COOKIE_PRIMARY_KEY, process.env.COOKIE_SECONDARY_KEY],
//     maxAge: 3 * 60 * 1000,
//   })
// );

app.use(
  session({
    secret: process.env.COOKIE_PRIMARY_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use("/users", userRouter);
app.use("/emp", employeeRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Invalid route!",
  });
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
