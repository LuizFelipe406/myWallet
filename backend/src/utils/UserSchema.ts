import Joi from 'joi';

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  username: Joi.string().min(3).required(),
  pictureUrl: Joi.string().required(),
});

export default loginSchema;