import Joi from 'joi';

const loginSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
  date: Joi.date().required(),
  category: Joi.string().required()
});

export default loginSchema;