const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  // проверяем, есть ли в БД юзер с таким verificationToken
  const user = await User.findOne({ verificationToken });

  // если такого юзера нет - ошибка 404
  if (!user) {
    throw HttpError(404, "User not found");
  }

  // если есть - находим этого юзера по его id и обновляем его обьекту поля verify & verificationToken
  // теперь юзер может залогиниться
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
