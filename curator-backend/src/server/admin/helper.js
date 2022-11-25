'use strict';
require("dotenv").config();


var Promise = require('bluebird'),
  db = require('../../db/dynamodb');

const uuid = require('../../helpers/uuid');
const AWS = require("aws-sdk");


async function approveAnswer(item){
    item.id = uuid();
    const timestamp = Date.now();
    item.created_at = timestamp;

    let data = db('put', {
        TableName: 'approveAnswer',
        Item: item,
        ReturnValues: "ALL_OLD"
      });

    /*db('update', {
      TableName: 'answers',
      Key: {
        id: item.answers_id,
      },
      UpdateExpression: 'set isCompleted = :isCompleted',
      ExpressionAttributeValues: {
        ':isCompleted': 'Yes',
      },
    });*/

    return data
}

async function getapproveAnswer(user_id){
  return  db('scan', {
    TableName: 'approveAnswer',
    FilterExpression: '#user_id = :user_id ',
    ExpressionAttributeNames: {
      '#user_id': 'user_id',
    },
    ExpressionAttributeValues: {
      ':user_id': user_id,
    },
  });

}

module.exports = {
    approveAnswer: approveAnswer,
    getapproveAnswer:getapproveAnswer
  };