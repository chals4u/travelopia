'use strict';

var Promise = require('bluebird'),
  db = require('../../db/dynamodb');

const uuid = require('../../helpers/uuid');
const AWS = require("aws-sdk");

function getCategories() {

  return db('scan', {
      TableName: 'Categories',
    });
}

function deleteCategories(id) {
  return db('delete', {
    TableName: 'Categories',
    Key: {
      id: id,
    },
  });
}

function saveCategories(item){
    const data = {
      id: uuid(),
      details: item
    };
     db('put', {
      TableName: 'Categories',
      Item: data
      // ReturnValues: "ALL_OLD"
    });
    return data
}


function updateCategories(id,data) {  
  return db('update', {
    TableName: 'Categories',
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
    getCategories: getCategories,
    getCategoriesById:getCategoriesById,
    saveCategories: saveCategories,
    deleteCategories: deleteCategories,
    updateCategories:updateCategories
  };