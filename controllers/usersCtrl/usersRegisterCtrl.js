import { User } from "../../models/userModel.js";
import { ctrlWrapper, HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use ");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
    },
  });
};

export { registerUser };
