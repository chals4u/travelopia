'use strict';

var Promise = require('bluebird'),
  db = require('../../db/dynamodb');

const uuid = require('../../helpers/uuid');
const AWS = require("aws-sdk");

function getUserByEmail(email) {  
  return db('scan', {
    TableName: 'curatorUsers',
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': email,
    },
  });
}

function createUser(data) {
  data.id = uuid();   
  return db('put', {
    TableName: 'curatorUsers',
    Item: data,
  });
}

function updateUser(id,data) {  
  return db('update', {
    TableName: 'curatorUsers',
    Key: {
      id:id,
    },
    UpdateExpression: 'SET details = :details',
    ExpressionAttributeValues: {
      ':details': data,
    },
    ReturnValues: 'ALL_NEW',
  });
}

function getUserById(id) {
  return db('query', {
    TableName: 'curatorUsers',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
    ExpressionAttributeNames: {
      '#id': 'id',
    },
  });
}

function sms(){

   var params = {
    Message: 'Test',
    PhoneNumber: '+919629108280',
    MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
            'DataType': 'String',
            'StringValue': 'OTP'
        },'AWS.SNS.SMS.SMSType': {
            'DataType': 'String',
            'StringValue': "Transactional"
        }
    }
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31', region: 'us-east-1' }).publish(params).promise();

  publishTextPromise.then(
      function (data) {
        console.log("Data "+JSON.stringify(data));
          return data;
      }).catch(
          function (err) {
            console.log("err "+err);
            return err;
   });


}

module.exports = {  
  createUser: createUser,
  getUserByEmail: getUserByEmail, 
  getUserById : getUserById,
  sms,sms,
  updateUser: updateUser
};