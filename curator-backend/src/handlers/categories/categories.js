"use strict";
const CategoriesController = require("../../server/categories/categories.controller");
const {success, error} = require("../../helpers/apiResponse");

/*module.exports.getCategories = async (event, context, req) => {
    try {
      if (!event.headers.Authorization) {
        const result = error("You are not Authorized!", 401);
        return (context.res = {
          statusCode: 400,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
  
      const response = await CategoriesController.getCategories();
      if (!response.status) {
        const result = error(response.error, response.code ? response.code : 500);
        return (context.res = {
          statusCode: response.code ? response.code : 500,
          body: JSON.stringify(result),
          isBase64Encoded: false,
        });
      }
  
      const result = success("Ok", response.user, 200);
  
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
  
  module.exports.getCategories = (event, context, callback) => {
    CategoriesController.getCategories(event, callback);
  };

  module.exports.createCategories = (event, context, callback) => {
    CategoriesController.createCategories(event, callback);
  };

  module.exports.deleteCategories = (event, context, callback) => {
    CategoriesController.deleteCategories(event, callback);
  };