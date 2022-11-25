
const jwt_decode = require('jwt-decode');
const helper = require('./helper');
const response = require('../../../helpers/response');
const { success, error } = require('../../../helpers/apiResponse');

module.exports.getUserCategory = async (event, cb) => {
    try {
      
      const user = await helper.getUserCategory();
      if (user.Count > 0) {
        const result = success('Ok', user.Items[0], 200);
        return cb(null, response.create(200, result));
      }
    } catch (err) {
      console.log(err);
      const result = error(err.message, 500);
      return cb(null, response.create(500, result));
    }
  };

  module.exports.createUserCategory = async (event, cb) => {
    try {
      const data = JSON.parse(event.body);
  
      if (!data || !data.category_name  || !data.user_id) {
        const result = error('Invalid details!!', 400);
        return cb(null, response.create(400, result));
      }

      const newUserCategory = await helper.createUserCategory(data);
        if (newUserCategory) {
          const result = success('Ok', newUserCategory, 200);
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