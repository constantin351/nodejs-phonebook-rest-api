const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, `Email ${email} is in use`);
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    // генерируем ссылку на временную аватарку юзера (передаем имейл регистрируемого юзера)
    const avatarUrl = gravatar.url(email); 

    const newUser = await User.create({...req.body, password: hashedPassword, avatarURL: avatarUrl});

    res.status(201).json ({
        status: "success",
        code: 201,
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    })
};

module.exports = register;