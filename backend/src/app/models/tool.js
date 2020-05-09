import mongoose from "mongoose";

const tool = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestemps: true,
  }
);

mongoose.model("tool", tool);
