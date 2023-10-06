import { User } from "../../models/userModel.js";
import { ctrlWrapper, HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  const { SECRET_WORD_JWT } = process.env;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong ");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong ");
  }
  const payload = { id: user._id, email: user.email };
  const accessToken = jwt.sign(payload, SECRET_WORD_JWT, { expiresIn: "1h" });
  const updateUser = await User.findByIdAndUpdate(
    { _id: user._id },
    { token: accessToken }
  );
  res.status(200).json({
    token: accessToken,
    user: {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
  });
};



export { loginUser };
