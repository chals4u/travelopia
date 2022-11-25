const { error, success } = require('../../helpers/apiResponse');
const jwt_decode = require("jwt-decode");
const {connectToDatabase} = require("../../db/db");
const { auth } = require('../middleware/Auth');
const helper = require('./helper');
const answerHelper = require('../answer/helper');

const response = require('../../helpers/response');

module.exports.approveAnswer = async (event, cb) => {
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
      const data = JSON.parse(event.body);
     
      if (!data || !data.question_id || !data.category_id || !data.user_id || !data.answers_id) {
        const result = error('Invalid details!!', 400);
        return cb(null, response.create(400, result));
      }

          
        const approveAnswer = await helper.approveAnswer(data);
        if (approveAnswer) {
          const answerCount = await answerHelper.calculateScore(data.user_id);
          const approveAnswerItem = await helper.getapproveAnswer(data.user_id);
          const QuestionCount = await answerHelper.getUserScore(data.user_id);
         
          let symptomCount = 0;
          let acceptsymptomCount = 0;
          answerCount.Items.forEach(function (item) {
            if(item.symptom.length != undefined){
              symptomCount = symptomCount + item.symptom.length;
            }             
          })

          approveAnswerItem.Items.forEach(function (item) {            
            if(item.synonyms.length != undefined){
              acceptsymptomCount = acceptsymptomCount + item.synonyms.length;
            }             
          })
          
          let quantity_score = QuestionCount.Items[0].quantity_score;
          let quality_by_def = 0;
          let quality_by_sys = 0;
          let quality_score = 0;
          quality_by_def = approveAnswerItem.Count/answerCount.Count;
          quality_by_sys = acceptsymptomCount/symptomCount;
          console.log(quality_by_def+" "+quality_by_sys);
          quality_score = 0.25*quality_by_def + 0.25*quality_by_sys;
          let scoreData = {};
          scoreData.quality_score = quality_score;
          scoreData.quantity_score = quantity_score;          
          scoreData.score = 0.5*quantity_score + 0.5*quality_score;
          scoreData.user_id = data.user_id;  
          scoreData.id = QuestionCount.Items[0].id;
          console.log(scoreData);
          const scoreResult = await answerHelper.updateScore(scoreData);       

          const result = success('Ok', approveAnswer, 200);
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