import { Schema, model } from "mongoose";
import {
  handleMongooseError,
  runValidatorsAtUpdate,
} from "../helpers/index.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

export { User };
