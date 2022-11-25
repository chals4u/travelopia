const { error, success } = require('../../helpers/apiResponse');
const Question = require("./question.model");
const jwt_decode = require("jwt-decode");
const {connectToDatabase} = require("../../db/db");
const { auth } = require('../middleware/Auth');
const helper = require('./helper');
const response = require('../../helpers/response');


  module.exports.getQuestion = async(event,cb)=>{
    try {
    
      if (!event.headers.Authorization) {
        const result = error('You are not Authorized!', 401);
        return cb(null, response.create(401, result));
      }
      const response_ = await auth(event.headers.Authorization);
      if(!response_){
        const result = error(response_.error, response_.code);
        return cb(null, response.create(401, result));
      }
      
      const categories_id = event.pathParameters.id;
      const categories = await helper.getCategoriesById(categories_id);
      console.log(categories); 
      
      const question = await helper.getQuestionByCategory(categories_id);
      
      if (question.Count > 0) {      
        const Items = question.Items;
        let randomItemNumber = helper.getRandomNumber(0,question.Count);
        let randomQuestion = [];
        randomItemNumber.forEach(function(value){
          Items[value].answer_count = 0;
          Items[value].score = 0;
          Items[value].categories = categories.Items
          if(Items[value]!=undefined) randomQuestion.push(Items[value]);  
        });
        
        let QuestionAnswer = [];
        QuestionAnswer.push({
                  'question':randomQuestion,
                  'categories':categories.Items
        })
        const result = success('Ok', randomQuestion, 200);
        return cb(null, response.create(200, result));
      } else {
        const result = error("Not found", 200);
       return cb(null, response.create(404,result));
      }
    } catch (err) {
      console.log(err);
      const result = error(err.message, 500);
      return cb(null, response.create(500,result));
    }
  };

  exports.deleteQuestion = async (event,cb) => {
    try {
      if (!event.headers.Authorization) {
        const result = error('You are not Authorized!', 401);
        return cb(null, response.create(401, result));
      }
      const response_ = await auth(event.headers.Authorization);
      if(!response_){
        const result = error(response_.error, response_.code);
       return cb(null, response.create(401, result));
      }
      //const data = JSON.parse(event);
      console.log(event.pathParameters.id);
      const deleteQuestion = await helper.deleteQuestion(event.pathParameters.id);
      const result = success('Ok', deleteQuestion, 200);
      return cb(null, response.create(200,result));
    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500,result));
    }
  };

  module.exports.createQuestion = async (event, cb) => {
    try {
      const data = JSON.parse(event.body);
      /*if (!event.headers.Authorization) {
        const result = error('You are not Authorized!', 401);
        return cb(null, response.create(401, result));
      }
      const response_ = await auth(event.headers.Authorization);
      if(!response_){
        const result = error(response_.error, response_.code);
       return cb(null, response.create(401, result));
      }*/
      const newQuestion = await helper.createQuestion(data);
        if (newQuestion) {
          const result = success('Ok', newQuestion, 200);
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