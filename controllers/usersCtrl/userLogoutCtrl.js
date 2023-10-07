import { User } from "../../models/userModel.js";
import { HttpError } from "../../helpers/index.js";

const logoutUser = async (req, res, next) => {
  const user = req.body.user;
  const searchedUser = await User.findById(user._id);
  if (!searchedUser) {
    next(HttpError(401, "Not authorized"));
  }
  if (searchedUser.token === "") {
    next(HttpError(401, "Not authorized"));
  }
  const updateUser = await User.findByIdAndUpdate(
    { _id: user._id },
    { token: "" },
    { new: true }
  );

  res.status(204).json("No contact");
};

export { logoutUser };
