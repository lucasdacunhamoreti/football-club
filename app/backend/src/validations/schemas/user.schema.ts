import * as Joi from 'joi';

const messageFields = 'All fields must be filled';

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': messageFields,
    'string.empty': messageFields,
  }),
  password: Joi.string().required().messages({
    'any.required': messageFields,
    'string.empty': messageFields,
  }),
});

export default userSchema;
