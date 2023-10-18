import express from "express";
import { userJoiSchema } from "../../schemas/index.js";
import { validateBody, isValidToken, upload } from "../../middlewares/index.js";
import {
  register,
  login,
  logout,
  current,
  update,
  updateAvatar,
  verifyEmail,
  resendEmail,
} from "../../controllers/usersCtrl/index.js";
import {
  userUpdateJoiSchema,
  emailVerifyJoiSchema,
} from "../../schemas/userSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userJoiSchema), register);

authRouter.post("/login", validateBody(userJoiSchema), login);

authRouter.post("/logout", isValidToken, logout);

authRouter.get("/current", isValidToken, current);

authRouter.patch("/", validateBody(userUpdateJoiSchema), isValidToken, update);

authRouter.patch(
  "/avatars",
  isValidToken,
  upload.single("avatar"),
  updateAvatar
);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailVerifyJoiSchema), resendEmail);
export { authRouter };
