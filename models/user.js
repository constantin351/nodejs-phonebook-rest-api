const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp, // добавлено
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false, // false - email юзера еще не прошел верификацию
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .error(new Error("missing required password field")),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .error(new Error("missing required email field")),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
  owner: Joi.string(),
});

// Joi схема для проверки имейла юзера (для повторной отправки email юзеру с ссылкой для верификации, если 1й email не дошел юзеру)
const emailVerificationSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .error(new Error("missing required email field")),
});

// Joi схема на логинизацию
const loginSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .error(new Error("missing required password field")),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .error(new Error("missing required email field")),
});

// Joi схема на обновление подписки (starter/pro/business)
const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  registerSchema,
  emailVerificationSchema,
  loginSchema,
  subscriptionJoiSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
