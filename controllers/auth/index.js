const { cntrlWrapper } = require("../../helpers");

const register = require("./register");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");


module.exports = {
  register: cntrlWrapper(register),
  verifyEmail: cntrlWrapper(verifyEmail),
  resendVerifyEmail: cntrlWrapper(resendVerifyEmail),
  login: cntrlWrapper(login),
  getCurrentUser: cntrlWrapper(getCurrentUser),
  logout: cntrlWrapper(logout),
  updateSubscription: cntrlWrapper(updateSubscription),
  updateAvatar: cntrlWrapper(updateAvatar),
};
