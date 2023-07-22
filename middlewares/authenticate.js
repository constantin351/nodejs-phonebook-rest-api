const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {HttpError} = require("../helpers");
const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers; // req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjg0ZjgxZTJkZDE5ZGU1OGQ4M2YzNiIsImlhdCI6MTY4OTgwMDU5NywiZXhwIjoxNjg5OTczMzk3fQ.QC2RjuBys6WMJKkwjfe_qOO5Xy0IDslfcEbqx1aeqsg"
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    };

    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        // если нет user с таким токеном или у него нет токена или его токен не совпадает с токеном, полученным из req.headers
        if (!user || !user.token || user.token !== token) { 
            next(HttpError(401, "Not authorized"));
        }
        // если пользователь существует и токен совпадает с тем, что находится в базе - к обьекту req добавляем ключ user и присваиваем ему значение найденные по id юзера данные 
        req.user = user;
        next();
    } catch {
        next(HttpError(401, "Not authorized"));
    };
};

module.exports = authenticate;