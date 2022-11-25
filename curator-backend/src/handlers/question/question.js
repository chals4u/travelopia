"use strict";
const QuestionController = require("../../server/question/question.controller");
const {success, error} = require("../../helpers/apiResponse");

/*module.exports.getQuestion = async (event, context, req) => {
    try {
      const body = JSON.parse(event.body);
      const categories_id = body.categories_id;
      if (!event.headers.Authorization) {
        const result = error("You are not Authorized!", 401);
        return (context.res = {
          statusCode: 400,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
      
      const response = await QuestionController.getQuestion(categories_id);
      if (!response.status) {
        const result = error(response.error, response.code ? response.code : 500);
        return (context.res = {
          statusCode: response.code ? response.code : 500,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
  
      const result = success("Ok", response.question, 200);
  
      return (context.res = {
        statusCode: 201,
        body: JSON.stringify(result),
        isBase64Encoded: false,
      });
    } catch (err) {
      console.log("handlerError", err);
      return (context.res = {
        statusCode: 500,
        body: JSON.stringify(err.message),
        isBase64Encoded: false,
      });
    }
  };*/
  
  module.exports.getQuestion = (event, context, callback) => {
    QuestionController.getQuestion(event, callback);
  };

  module.exports.createQuestion = (event, context, callback) => {
    QuestionController.createQuestion(event, callback);
  };

  module.exports.deleteQuestion = (event, context, callback) => {
    QuestionController.deleteQuestion(event, callback);
  };