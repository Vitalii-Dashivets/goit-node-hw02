import { registerUser } from "./usersRegisterCtrl.js";
import { loginUser } from "./userLoginCtrl.js";
import { logoutUser } from "./userLogoutCtrl.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { userCurrent } from "./userCurrent.js";
import { updateUser } from "./updateUser.js";

const register = ctrlWrapper(registerUser);
const login = ctrlWrapper(loginUser);
const logout = ctrlWrapper(logoutUser);
const current = ctrlWrapper(userCurrent);
const update = ctrlWrapper(updateUser);
export { register, login, logout, current, update };
