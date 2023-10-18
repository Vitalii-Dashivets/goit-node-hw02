import { User } from "../../models/userModel.js";
import { ctrlWrapper, HttpError, sendEmail } from "../../helpers/index.js";

const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found ");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: " ",
  });
  res.json({ message: "Email verify success" });
};

export { verifyUserEmail };
