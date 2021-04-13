import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { User } from "../models/User";


export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('posts');
  if(!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    msg: `show user ${req.params.id}`,
    data: user
  });
});
