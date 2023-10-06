import express from "express";
import { userJoiSchema } from "../../schemas/index.js";
import { validateBody, isValidToken } from "../../middlewares/index.js";
import {
  register,
  login,
  logout,
  current,
  update,
} from "../../controllers/usersCtrl/index.js";
import { userUpdateJoiSchema } from "../../schemas/userSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userJoiSchema), register);

authRouter.post("/login", validateBody(userJoiSchema), login);

authRouter.post("/logout", isValidToken, logout);

authRouter.post("/current", isValidToken, current);

authRouter.patch("/", validateBody(userUpdateJoiSchema), isValidToken, update);

export { authRouter };
