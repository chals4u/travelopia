"use strict";
const AdminController = require("../../server/admin/admin.controller");
const {success, error} = require("../../helpers/apiResponse");

module.exports.approveAnswer = (event, context, callback) => {
    AdminController.approveAnswer(event, callback);
  };