import { User } from "../../models/userModel.js";

const updateUser = async (req, res, next) => {
  const contactId = req.body.user._id;
  const result = await User.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export { updateUser };
