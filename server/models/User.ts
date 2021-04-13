import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please add a name"],
  },
  last_name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  about: {
    type: String,
    required: [true, "Please add an about description"],
    maxlength: [200, "max length of 300 characters"]
  },
  password: {
    type: String,
    required: [true, "Please set a password"],
    minlength: 6,
    select: false,
  },
  image: {
    required: [true, "Please select an image"],
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
  justOne: false,

});

// Encrypt password using bycrypt
userSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  const app: any = this;
  app.password = await bycrypt.hash(app.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Match user entered password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword: String) {
  return await bycrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export { User };
