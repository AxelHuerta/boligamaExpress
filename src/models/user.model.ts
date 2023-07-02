import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // quita espacios en blanco
      trim: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
      // quita espacios en blanco
      trim: true,
      min: 3,
    },
    credits: {
      type: Number,
      required: true,
    },
    approvedUEAs: {
      type: [String],
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("User", userSchema);
