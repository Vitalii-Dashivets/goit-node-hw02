import Joi from "joi";

const emailRegexp =
  /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;

const userJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const userUpdateJoiSchema = Joi.object({
  subscription: Joi.string(),
  token: Joi.string(),
});
export { userJoiSchema, userUpdateJoiSchema };
