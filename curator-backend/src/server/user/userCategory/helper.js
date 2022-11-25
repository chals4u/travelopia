'use strict';

var Promise = require('bluebird'),
db = require('../../../db/dynamodb');

const uuid = require('../../../helpers/uuid');

function getUserCategory() {
    return db('scan', {
      TableName: 'userCategory',
    });
}
  
function createUserCategory(data) {
    data.id = uuid();   
    return db('put', {
      TableName: 'userCategory',
      Item: data,
    });
}

  module.exports = {
    getUserCategory: getUserCategory,
    createUserCategory: createUserCategory
  };
  