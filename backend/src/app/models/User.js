import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { isEmail } from "validator";
const SALT_WORK_FACTOR = 10;

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email"],
      createIndexes: { unique: true },
    },
    password: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestemps: true,
  }
);

User.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

User.methods = {
  comparePassword(pass) {
    return bcrypt.compare(pass, this.password);
  },
};

module.exports = mongoose.model("User", User);
