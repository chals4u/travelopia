"use strict";
const AnswerController = require("../../server/answer/answer.controller");
const {success, error} = require("../../helpers/apiResponse");

/*module.exports.saveAnswer = async (event, context, req) => {
    try {
      if (!event.headers.Authorization) {
        const result = error("You are not Authorized!", 401);
        return (context.res = {
          statusCode: 401,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
  
      const body = JSON.parse(event.body);
  
      if (!body) {
        const result = error("Invalid details!!", 400);
        return (context.res = {
          statusCode: 400,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
  
      const response = await AnswerController.store(
        event.headers.Authorization,
        body
      );
      if (!response.status) {
        const result = error(response.error, response.code ? response.code : 500);
        return (context.res = {
          statusCode: response.code ? response.code : 500,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
  
      const result = success("Ok", response.data, 200);
  
      return (context.res = {
        statusCode: 201,
        body: JSON.stringify(result),
        isBase64Encoded: false,
      });
    } catch (err) {
      console.log("handlerError", err);
      return (context.res = {
        statusCode: 400,
        body: JSON.stringify(err.message),
        isBase64Encoded: false,
      });
    }
  };*/


  module.exports.saveAnswer = (event, context, callback) => {
    AnswerController.saveAnswer(event, callback);
  };

  module.exports.getAnswers = (event, context, callback) => {
    AnswerController.getAnswers(event, callback);
  };

  module.exports.getAllAnswers = (event, context, callback) => {
    AnswerController.getAllAnswers(event, callback);
  };

  module.exports.getQuestionAnswers = (event, context, callback) => {
    AnswerController.getQuestionAnswers(event, callback);
  };
  
  module.exports.getUserScore = (event, context, callback) => {
    AnswerController.userScoreCalculation(event, callback);
  };

  module.exports.deleteAnswers = (event, context, callback) => {
    AnswerController.deleteAnswers(event, callback);
  };
  