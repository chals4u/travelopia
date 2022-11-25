const { error, success } = require('../../helpers/apiResponse');
const jwt_decode = require("jwt-decode");
const {connectToDatabase} = require("../../db/db");
const { auth } = require('../middleware/Auth');
const helper = require('./helper');
const response = require('../../helpers/response');

  module.exports.saveComments = async (event, cb) => {
    try {

      /*if (!event.headers.Authorization) {
        const result = error('You are not Authorized!', 401);
        return cb(null, response.create(401, result));
      }
      const response_ = await auth(event.headers.Authorization);
      if(!response_){
        const result = error(response_.error, response_.code);
        return cb(null, response.create(401, result));
      } */
      const data = JSON.parse(event.body);
     
      if (!data || !data.question_id || !data.user_id || !data.answer_id || !data.comments_type) {
        const result = error('Invalid details!!', 400);
        return cb(null, response.create(400, result));
      }   
      const newComments = await helper.saveComments(data);
        if (newComments) {          
          const result = success('Ok', newComments, 200);
          return cb(null, response.create(201, result));
        } else {
          const result = error(err, 500);
          return cb(null, response.create(500, result));
        }
    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500, result));    
    }
  };
