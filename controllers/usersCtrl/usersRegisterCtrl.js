import { User } from "../../models/userModel.js";
import { ctrlWrapper, HttpError, sendEmail } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { BASE_URL } = process.env;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use ");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURL,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="blank" href="${BASE_URL}/users/verify/${verificationToken}">
        Click verify email
      </a>`,
  };
  sendEmail(verifyEmail)
    .then(console.log("Email send"))
    .catch((error) => {
      console.log(error);
    });
  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
    },
  });
};

export { registerUser };
