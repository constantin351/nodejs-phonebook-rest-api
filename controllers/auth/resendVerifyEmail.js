const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, `Email ${email} not found`);
  }

  // если юзер уже был верифицирован (не будем повторно отправлять ему письмо со ссылкой)
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  // если не был верифицирован - создаем имейл для повторной отправки юзеру (с его verificationToken из БД)
  const verifyEmail = {
    to: email,
    subject: "Email re-verification",
    // в теле письма отправляем ссылку на уникальный адрес для перехода и потверждения имейла юзером
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  // и отправляем повторный имейл
  await sendEmail(verifyEmail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
