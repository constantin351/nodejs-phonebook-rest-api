const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");

// путь к папке с аватарками
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const {_id} = req.user;

    /* path - полный временный путь к загружаемому файлу req.file (переименовываем на tempUpload),
    originalname - имя загружаемого на клиенте файла (берем из req.file) */ 
    const {path: tempUpload, originalname} = req.file;

    // создаем оригинальное имя файла
    const fileName = `${_id}_${originalname}`;
    // создаем путь, где должен лежать аватар
    const resultUpload = path.join(avatarsDir, fileName);

    // Jimp берет аватар из временной tmp папки, меняет размер, перемещает файл из временной папки tmp в новую public/avatars
    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250, 250);
    avatar.write(resultUpload);

    // fs.rename перемещает файл из временной папки tempUpload в resultUpload
    // await fs.rename(tempUpload, resultUpload);

    // удаляем файл из временной папки tmp
    fs.unlink(tempUpload);
    
    // создаем путь для сохранения в БД
    const avatarURL = path.join("avatars", fileName);
    // берем _id юзера (из req.user) и в базе по _id перезаписываем новый путь (avatarURL)
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.status(200).json({
        status: "success",
        code: 200,
        avatarURL,
    })
};

module.exports = updateAvatar;