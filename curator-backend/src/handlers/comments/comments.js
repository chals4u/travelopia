"use strict";
const CommentsController = require("../../server/comments/comments.controller");
const {success, error} = require("../../helpers/apiResponse");

module.exports.saveComments = (event, context, callback) => {
    CommentsController.saveComments(event, callback);
  };