import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", CommentsSchema);

export default CommentModel;
