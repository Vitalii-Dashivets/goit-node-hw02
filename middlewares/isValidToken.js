import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { User } from "../models/userModel.js";

const isValidToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const { SECRET_WORD_JWT } = process.env;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_WORD_JWT);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401));
    }
    req.body.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

export { isValidToken };
