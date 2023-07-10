const Joi = require("joi");

const addContactSchema = Joi.object({
    email: Joi.string().email().required().error(new Error('missing required email field')),
    name: Joi.string().required().error(new Error('missing required name field')),
    phone: Joi.string().regex(/\(\d{3}\) \d{3}-\d{4}/).required().error(new Error('missing required phone field')),
  });

module.exports = {
    addContactSchema,
};