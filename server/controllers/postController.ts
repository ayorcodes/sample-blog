import { Post } from "../models/Post";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";

//@desc get all posts
//@route GET /api/v1/posts
//@route GET /api/v1/bootcamps/:bootcampId/posts
//@access Public

export const getPosts = asyncHandler(async (req, res, next) => {
  let query: any;

  if (req.params.bootcampId) {
    query = Post.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Post.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const posts = await query;

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

//@desc get single posts
//@route GET /api/v1/posts/:id
//@access Public

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!post) {
    return next(
      new ErrorResponse(`No post with Id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});


//@desc add post
//@route POST /api/v1/bootcamps/:bootcampId/posts
//@access Private

export const addPost = asyncHandler(async (req, res, next) => {

  /* req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Post.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with Id of ${req.params.bootcampId}`, 404)
    );
  } */

  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    data: post,
  });
});

//@desc update post
//@route PUT /api/v1/posts/:id
//@access Private

export const updatePost = asyncHandler(async (req, res, next) => {

  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No bootcamp with Id of ${req.params.bootcampId}`, 404)
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: post,
  });
});



//@desc delete post
//@route DELETE /api/v1/posts/:id
//@access Private

export const deletePost = asyncHandler(async (req, res, next) => {

  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No bootcamp with Id of ${req.params.bootcampId}`, 404)
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: post,
  });
});
