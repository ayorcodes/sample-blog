import express from "express";
import { register, login, getMe } from "../controllers/authController";

const userRouter = express.Router();

import { getUser } from "../controllers/userController";

/* userRouter.post("/register", register);
userRouter.post("/login", login); */
userRouter.route("/:id").get(getUser);

export { userRouter };
