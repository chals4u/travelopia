'use strict';

var Promise = require('bluebird'),
db = require('../../db/dynamodb');
const questionCount = process.env.QUESTION_PER_DAY;
const answerScore = process.env.ANSWER_SCORE;
const likeAnswerScore = process.env.LIKE_ANSWER_SCORE;
const accpetScore = process.env.ACCPET_SCORE;
const uuid = require('../../helpers/uuid');
const AWS = require("aws-sdk");

 async function deleteAnswers(){
    db('delete', {
      TableName: 'questionCount',
      Key: {
        id: id,
      }
    });
 }
async function saveAnswer(item){
    item.id = uuid();

    db('update', {
      TableName: 'questions',
      Key: {
        id: item.question_id,
      },
      UpdateExpression: 'set isCompleted = :isCompleted',
      ExpressionAttributeValues: {
        ':isCompleted': 'Yes',
      },
    });

    const timestamp = Date.now();
    item.created_at = timestamp;
    
    let data = db('put', {
      TableName: 'answers',
      Item: item,
      ReturnValues: "ALL_OLD"
    });


    return item
}


async function getTodayQuestionCountOfUser(user_id){
  
  let start = new Date();
  start.setUTCHours(0,0,0,0);
  
  let end = new Date();
  end.setUTCHours(23,59,59,999);
 
  return  db('scan', {
    TableName: 'questionCount',
    //ProjectionExpression: "id",
    //FilterExpression: '#user_id = :user_id ',
    FilterExpression: "#user_id = :user_id AND #created_at >= :start AND #created_at <= :end",
    ExpressionAttributeNames: {
      '#user_id': 'user_id',
      '#created_at': "created_at",
    },
    ExpressionAttributeValues: {
      ':user_id': user_id,
      ':start':start.getTime() ,
      ':end': end.getTime()
    },
  });
}

async function QuestionCountOfUser(data){
  data.id = uuid();
  const timestamp = Date.now();
  data.count = questionCount;
  data.created_at = timestamp;
  data.created_by = data.user_id;
  console.log(data);
  return db('put', {
      TableName: 'questionCount',
      Item: data,
      ReturnValues: "ALL_OLD"
    });  
}


async function calculateScore(user_id){
 return  db('scan', {
    TableName: 'answers',
    FilterExpression: '#user_id = :user_id ',
    ExpressionAttributeNames: {
      '#user_id': 'user_id',
    },
    ExpressionAttributeValues: {
      ':user_id': user_id,
    },
  });
}
function saveScore(data){
    data.id = uuid();
    const timestamp = Date.now();
    data.created_at = timestamp;
    data.created_by = data.user_id;
    return db('put', {
        TableName: 'score',
        Item: data,
        ReturnValues: "ALL_OLD"
      });  
}
function updateScore(data){
  return db('update', {
    TableName: 'score',
    Key: {
      id: data.id,
    },
    UpdateExpression: 'SET quantity_score = :quantity_score, quality_score =:quality_score',
    ExpressionAttributeValues: {
      ':quantity_score': data.quantity_score,
      ':quality_score': data.quality_score,
    },
    ReturnValues: 'ALL_NEW',
  });
}
function getUserScore(user_id){
 
  return  db('scan', {
    TableName: 'score',
    FilterExpression: '#user_id = :user_id ',
    ExpressionAttributeNames: {
      '#user_id': 'user_id',
    },
    ExpressionAttributeValues: {
      ':user_id': user_id,
    },
  });
}
function getAnsersByuser(user_id){
  return  db('scan', {
    TableName: 'answers',
    FilterExpression: '#user_id = :user_id ',
    ExpressionAttributeNames: {
      '#user_id': 'user_id',
    },
    ExpressionAttributeValues: {
      ':user_id': user_id,
    },
  });
}
  
function getAllAnswersQuestion(){
  return  db('scan', {
    TableName: 'questions',
    //ProjectionExpression: "id",
    FilterExpression: '#isCompleted = :isCompleted',
    ExpressionAttributeNames: {
      '#isCompleted': 'isCompleted',
    },
    ExpressionAttributeValues: {
      ':isCompleted': 'Yes',
    },
  });
}
function getQuestionDeails(question_id){
  return  db('scan', {
    TableName: 'questions',
    //ProjectionExpression: "id",
    FilterExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': question_id,
    },
  });
}

function getAnswerDeails(question_id){
  return  db('scan', {
    TableName: 'answers',
    //ProjectionExpression: "id",
    FilterExpression: '#question_id = :question_id',
    ExpressionAttributeNames: {
      '#question_id': 'question_id',
    },
    ExpressionAttributeValues: {
      ':question_id': question_id,
    },
  });
}

function getUserById(id) {
  return db('query', {
    TableName: 'user',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
    ExpressionAttributeNames: {
      '#id': 'id',
    },
  });
}

function socreConfig(){  
    let config = {}
    config.questionCount = questionCount;
    config.answerScore = answerScore;
    config.likeAnswerScore = likeAnswerScore;
    config.accpetScore = accpetScore;
    return config;
}

  module.exports = {
    saveAnswer: saveAnswer,
    getTodayQuestionCountOfUser,getTodayQuestionCountOfUser,
    QuestionCountOfUser,QuestionCountOfUser,
  
    calculateScore: calculateScore,
    saveScore:saveScore,
    getAnsersByuser: getAnsersByuser,
    getAllAnswersQuestion: getAllAnswersQuestion,
    getAnswerDeails:getAnswerDeails,
    getQuestionDeails:getQuestionDeails,
    socreConfig:socreConfig,
    getUserById:getUserById,
    getUserScore:getUserScore,
    updateScore:updateScore,
    deleteAnswers:deleteAnswers
  };