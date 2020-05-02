import mongoose from "mongoose";
import slugify from "slugify";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "Please add a body"],
  },
  slug: String,
  tags: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  }
});

// Static method to get an avg of course tuitions
/* PostSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);
  console.log(obj);
};

// Get average cost after save
PostSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});


// Get average cost before remove
PostSchema.pre('remove', function () {
  const app: any = this;
  app.constructor.getAverageCost(app.bootcamp);
}); */

PostSchema.pre("save", function (next) {
  const app: any = this;
  app.slug = slugify(app.title, { lower: true }) + app.user._id;
  next();
});

const Post = mongoose.model("Post", PostSchema);

export { Post };
