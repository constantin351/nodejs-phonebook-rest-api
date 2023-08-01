const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

// настройки multer MDLWRe
const multerConfig = multer.diskStorage({
    // где сохранить файл
    destination: tempDir,
    // под каким именем сохранить
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// создаем MDLWRe, предаем ф-ции multer обьект настроек, где в storage указывваем настройки 
const upload = multer({
    storage: multerConfig,
});

module.exports = upload;