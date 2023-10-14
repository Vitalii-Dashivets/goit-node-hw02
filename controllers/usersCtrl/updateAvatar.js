import { User } from "../../models/userModel.js";
import path from "path";
import fs from "fs/promises";
import { HttpError } from "../../helpers/HttpError.js";
import Jimp from "jimp";

const avatarsDir = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  console.log(tempUpload);
  await Jimp.read(tempUpload)
    .then((file) => {
      file
        .resize(250, 250) // resize
        //   .quality(60) // set JPEG quality
        //   .greyscale() // set greyscale
        .write(`${tempUpload}`); // save
    })
    .catch((error) => {
      throw error;
    });

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL: avatarURL });
};

export { updateUserAvatar };
