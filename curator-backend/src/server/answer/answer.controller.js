const { error, success } = require('../../helpers/apiResponse');
const AnswerModel = require("./answer.model");
const jwt_decode = require("jwt-decode");
const {connectToDatabase} = require("../../db/db");
const { auth } = require('../middleware/Auth');
const helper = require('./helper');
const response = require('../../helpers/response');

  module.exports.getAnswers = async(event,cb)=>{
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
      const user_id = event.pathParameters.id;
      const answers = await helper.getAnsersByuser(user_id);
      
      if (answers.Count > 0) {     
        const result = success('Ok', answers.Items, 200);
        return cb(null, response.create(200, result));
      } else {
        const result = error("Not found", 200);
       return cb(null, response.create(404,result));
      }
    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500,result));
    }
  };

  module.exports.getAllAnswers = async(event,cb)=>{
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
      
      const answeredQuestion = await helper.getAllAnswersQuestion();
      
      if (answeredQuestion.Count > 0) {   
        const result = success('Ok', answeredQuestion.Items, 200);
        return cb(null, response.create(200, result));
      } else {
        const result = error("Not found", 200);
       return cb(null, response.create(404,result));
      }
    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500,result));
    }
  };

  module.exports.getQuestionAnswers = async(event,cb)=>{
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
      
      const question_id = event.pathParameters.id;
      const Question = await helper.getQuestionDeails(question_id);
       
      if (Question.Count > 0) {   
        //let user = await helper.getUserById('f31c49e7-511b-e569-0697-5c827cfd3ee8');    
       let user = {"id": "c65e2188-a66f-1c06-7767-68b8aa295439",
                    "detail": {
                      "authorized_by": "3",
                      "last_name": "User",
                      "telephone": "9876543210",
                      "isAuthorizeToAddUsers": false,
                      "middle_name": "-",
                      "first_name": "New",
                      "email": "rajmohan@codenatives.com",
                      "agreeToShare": false,
                      "username": "8023095f-af26-4eb5-af82-283ac26f1e53"
                  }};
        const Answer = await helper.getAnswerDeails(question_id);
        let QuestionAnswer = [];       
        const anserList = Answer.Items;
        anserList.forEach(function(value,i){         
          
          anserList[i].answer_accept = 0;
          anserList[i].user_details = user;
          anserList[i].score = 0;
        });
        QuestionAnswer.push({
          'question':Question.Items,
          'Answer':anserList
        });
        const result = success('Ok', QuestionAnswer, 200);
        return cb(null, response.create(200, result));
      } else {
        const result = error("Not found", 200);
        return cb(null, response.create(404,result));
      }
    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500,result));
    }
  };

  module.exports.userScoreCalculation = async(event,cb)=>{
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
      const user_id = event.pathParameters.id;
      const answers = await helper.calculateScore(user_id);     
     
     
      if (answers.Count > 0) {    

        let score = 0;       
        const anserList = answers.Items;
        anserList.forEach(function(value,i){         
          score = score + value.score;
        });
        const result = success('Ok', score, 200);
        return cb(null, response.create(200, result));      
      } else {
        const result = error("Not found", 200);
        return cb(null, response.create(404,result));
      }

    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500,result));
    }
  };


  module.exports.saveAnswer = async (event, cb) => {
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

      //Get the score or point configuration
      let config = helper.socreConfig();     
      const data = JSON.parse(event.body);      
      if (!data || !data.question_id || !data.category_id || !data.user_id) {
        const result = error('Invalid details!!', 400);
        return cb(null, response.create(400, result));
      }    
      const newAnswer = await helper.saveAnswer(data);
        if (newAnswer) {
          let scoreData = {};
          scoreData.question_id = data.question_id;
          scoreData.category_id = data.category_id;
          scoreData.user_id = data.user_id;
          scoreData.answer_id = newAnswer.id;
          scoreData.score = config.answerScore;
          const scoreResult = await helper.saveScore(scoreData);

          const result = success('Ok', newAnswer, 200);
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

  module.exports.deleteAnswers = async (event, cb) => {
    try {

      /*if (!event.headers.Authorization) {
        const result = error('You are not Authorized!', 401);
        return cb(null, response.create(401, result));
      }
      const response_ = await auth(event.headers.Authorization);
      if(!response_){
        const result = error(response_.error, response_.code);
        return cb(null, response.create(401, result));
      }      */
    
      const result = success('Ok', newAnswer, 200);
          return cb(null, response.create(201, result));
      /*const newAnswer = await helper.deleteAnswers();
        if (newAnswer) {      
          const result = success('Ok', newAnswer, 200);
          return cb(null, response.create(201, result));
        } else {
          const result = error(err, 500);
          return cb(null, response.create(500, result));
        }*/
    } catch (err) {
      const result = error(err.message, 500);
      return cb(null, response.create(500, result));    
    }
  };