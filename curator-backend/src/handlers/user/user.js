"use strict";
const UserController = require("../../server/user/user.controller");
const UserCategoryController = require("../../server/user/userCategory/userCategory.controller");

const {success, error} = require("../../helpers/apiResponse");


module.exports.getUserDetail = (event, context, callback) => {
  UserController.getUserDetail(event, callback);
};
module.exports.createUser = (event, context, callback) => {
  UserController.createUser(event, callback);
};
module.exports.loginUser = (event, context, callback) => {
  UserController.loginUser(event, callback);
};
module.exports.sms = (event, context, callback) => {
  UserController.sms(event, callback);
};
module.exports.getUserCategory = (event, context, callback) => {
  UserCategoryController.getUserCategory(event, callback);
};