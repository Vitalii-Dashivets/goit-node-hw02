import Joi from "joi";

const userJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const userUpdateJoiSchema = Joi.object({
  subscription: Joi.string(),
  token: Joi.string(),
});
export { userJoiSchema, userUpdateJoiSchema };
