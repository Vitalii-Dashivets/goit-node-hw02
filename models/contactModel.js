import { Schema, model } from "mongoose";
import {
  handleMongooseError,
  runValidatorsAtUpdate,
} from "../helpers/index.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleMongooseError);

const Contact = model("contact", contactSchema);

export { Contact };
