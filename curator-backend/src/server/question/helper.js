'use strict';

var Promise = require('bluebird'),
db = require('../../db/dynamodb');

const uuid = require('../../helpers/uuid');
const AWS = require("aws-sdk");

function getQuestionByCategory(category_id) {
    return  db('scan', {
      TableName: 'questions',
      //ProjectionExpression: "id",
      FilterExpression: '#categories_id = :categories_id AND #isCompleted = :isCompleted',
      ExpressionAttributeNames: {
        '#categories_id': 'categories_id',
        '#isCompleted': 'isCompleted',
      },
      ExpressionAttributeValues: {
        ':categories_id': category_id,
        ':isCompleted': 'No',
      },
    });
 }

 function getQuestion(questionID){
  return  db('scan', {
    TableName: 'questions',
    Key : {
      id: questionID
    }
  });
 }
 function getRandomNumber(min, max) {  
  var arr = [];
  if(max > 10){
    while(arr.length < 11){
      var r = Math.floor(Math.random() * (max - min + 1)) + min;
      if(!arr.includes(r)){
        arr.push(r);
      }    
    }
  }else{
    while(arr.length < max/2){
      var r = Math.floor(Math.random() * (max - min + 1)) + min;
      if(!arr.includes(r)){
        arr.push(r);
      }    
    }
  }
  
  return arr;
}

function updateQuestionCompleted(data){
  return db('update', {
    TableName: 'questions',
    Key: {
      id: data.id,
    },
    UpdateExpression: 'set isCompleted = :isCompleted',
    ExpressionAttributeValues: {
      ':isCompleted': data.isCompleted,
    },
  });
}
 function deleteQuestion(id) {
  return db('delete', {
    TableName: 'questions',
    Key: {
      id: id,
    },
  });
}

function createQuestion(item){
    
    item.id = uuid();    
   let result =  db('put', {
      TableName: 'questions',
      Item: item
      // ReturnValues: "ALL_OLD"
    });
    return item;
}

function getCategoriesById(id) {
  return db('query', {
    TableName: 'Categories',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': id,
    },
  });
}

 module.exports = {
    createQuestion:createQuestion,
    getQuestion: getQuestion,  
    updateQuestionCompleted:updateQuestionCompleted,
    getQuestionByCategory: getQuestionByCategory,
    getRandomNumber:getRandomNumber,
    deleteQuestion:deleteQuestion,
    getCategoriesById:getCategoriesById

 };