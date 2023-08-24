const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const {SECRET_KEY} = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, `Email ${email} or password is wrong`);
  }

  // юзер, не подтвердивший имейл, не может залогиниться (verify: false)
  if (!user.verify) {
    throw HttpError(401, `Email ${email} is not verified`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, `Email ${email} or password is wrong`);
  }

  //  создаем payload (обьект с _id юзера)
  const payload = { id: user._id };

  // создаем токен
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });

  // прикрепляем токен к обьекту юзера (для дальнейших запросов с токеном)
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    code: 200,
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;