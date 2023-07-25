const express = require("express");

const cntrl = require("../../controllers/auth");

const { validateBodyWithJoi, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

// signup / register
router.post("/users/register", validateBodyWithJoi(schemas.registerSchema), cntrl.register);

// signin / login 
router.post("/users/login", validateBodyWithJoi(schemas.loginSchema), cntrl.login);

// logout
router.post("/users/logout", authenticate, cntrl.logout);

// get current user
router.get("/users/current", authenticate, cntrl.getCurrentUser);

// обновление подписки пользователя
router.patch("/users/current/subscription", authenticate, validateBodyWithJoi(schemas.subscriptionJoiSchema), cntrl.updateSubscription);

module.exports = router;