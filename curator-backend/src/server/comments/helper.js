
'use strict';

var Promise = require('bluebird'),
db = require('../../db/dynamodb');

const uuid = require('../../helpers/uuid');
const AWS = require("aws-sdk");

function saveComments(item){

    const timestamp = Date.now(); 
    item.id = uuid();    
    item.created_at = timestamp;
    item.created_by = item.user_id;
    item.status = 'Active';
     db('put', {
      TableName: 'comments',
      Item: item
      // ReturnValues: "ALL_OLD"
    });
    return item;
}

module.exports = {
   saveComments: saveComments,
};