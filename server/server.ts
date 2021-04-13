import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser";
import cors from 'cors';

//load env vars
dotenv.config({
  path: "./config/config.env",
});

connectDB();

//Route files
import { postRouter } from "./routes/postRouter";
import { authRouter } from "./routes/authRouter";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(cors());

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});
