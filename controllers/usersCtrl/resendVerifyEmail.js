import { sendEmail } from "../../helpers/index.js";
import { User } from "../../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { BASE_URL } = process.env;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Missing required field email ");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verify ");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="blank" href="${BASE_URL}/users/verify/${user.verificationToken}">
        Click verify email
      </a>`,
  };
  sendEmail(verifyEmail)
    .then(console.log("Email send"))
    .catch((error) => {
      console.log(error);
    });
  res.json({ message: "Verification email sent" });
};
export { resendVerifyEmail };
