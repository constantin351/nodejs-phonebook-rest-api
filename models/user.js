const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,                     // добавлено
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  }, {versionKey: false, timestamps: true});

  userSchema.post("save", handleMongooseError);

  const registerSchema = Joi.object({
    password: Joi.string().min(6).required().error(new Error('missing required password field')),
    email: Joi.string().pattern(emailRegexp).required().error(new Error('missing required email field')),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
    owner: Joi.string(),
  });

  const loginSchema = Joi.object({
    password: Joi.string().min(6).required().error(new Error('missing required password field')),
    email: Joi.string().pattern(emailRegexp).required().error(new Error('missing required email field')),
  });

  // Joi схема на обновление подписки (starter/pro/business)
  const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });
  
  const schemas = {
    registerSchema,
    loginSchema,
    subscriptionJoiSchema,
  };

  const User = model("user", userSchema);

  module.exports = {
    User,
    schemas,
  };