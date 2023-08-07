const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// импортируем и вызываем dotenv
require("dotenv").config();

// подключаем роуты
const authRouter = require("./routes/api/auth");
const contactsRouter = require('./routes/api/contacts');

// создается экземпляр приложения (app веб-сервер)
const app = express(); // app - это и есть веб-сервер

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// подключается логгер, cors, обработка JSON (middlewares)
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// MDLWARE: если придет запрос за файлом - бери его из папки "public"
app.use(express.static("public"));

// подключение роутов в приложение
app.use('/api/auth', authRouter); // добавлено в hw-04
app.use('/api/contacts', contactsRouter);

// сначала обработка несуществующего роута или ошибка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

// потом обработка ошибок сервера (порядок подключаемого промежуточного ПО имеет значение)
app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message })
});

module.exports = app;
