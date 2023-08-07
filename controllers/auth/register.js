const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, `Email ${email} is in use`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // генерируем ссылку на временную аватарку юзера (передаем имейл регистрируемого юзера)
  const avatarUrl = gravatar.url(email);

  // создаем код подтверждения (verificationToken), кот юзер должен будет ввести
  const verificationCode = nanoid();

  // записываем в БД обьект нового юзера (+его временную аватарку + verificationToken/для верификации имейла)
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL: avatarUrl,
    verificationToken: verificationCode,
  });

  // после записи в БД нового юзера создаем имейл для отправки этому юзеру для подтверждения его имейла\регистрации
  const verifyEmail = {
    to: email,
    subject: "Email verification",
    // в теле письма отправляем ссылку на уникальный адрес для перехода и потверждения имейла юзером
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationCode}">Click to verify your email</a>`,
  };

  // отправляем созданный имейл юзеру используя SENDGRID
  await sendEmail(verifyEmail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
