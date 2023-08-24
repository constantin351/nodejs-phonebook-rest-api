const express = require("express");

const cntrl = require("../../controllers/auth");

const { validateBodyWithJoi, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

// signup / register
router.post("/users/register", validateBodyWithJoi(schemas.registerSchema), cntrl.register);

// email verification
router.get("/users/verify/:verificationToken", cntrl.verifyEmail);

// email re-verification (in case user hasn't received verification email with link, using this route 
// he sends his email-address, to again send him verification email)
router.post("/users/verify", validateBodyWithJoi(schemas.emailVerificationSchema), cntrl.resendVerifyEmail);

// signin / login 
router.post("/users/login", validateBodyWithJoi(schemas.loginSchema), cntrl.login);

// logout
router.post("/users/logout", authenticate, cntrl.logout);

// get current user
router.get("/users/current", authenticate, cntrl.getCurrentUser);

// обновление подписки юзера
router.patch("/users/current/subscription", authenticate, validateBodyWithJoi(schemas.subscriptionJoiSchema), cntrl.updateSubscription);

// обновление аватара залогиненным юзером
// upload.single("avatar") загружает один (single) файл из поля формы с name "avatar" во временную папку "tmp", а инфо о файле сохранется в req.file
// все остальные (текстовые) поля запишутся в req.body
router.patch("/users/avatars", authenticate, upload.single("avatar"), cntrl.updateAvatar);

module.exports = router;