import express from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
const postRouter = express.Router({ mergeParams: true });

postRouter
  .route("/")
  .get(getPosts)
  .post(protect, addPost);
postRouter
  .route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export { postRouter };
