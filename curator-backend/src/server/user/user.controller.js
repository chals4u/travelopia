
const jwt_decode = require('jwt-decode');
const helper = require('./helper');
const response = require('../../helpers/response');
const { success, error } = require('../../helpers/apiResponse');


module.exports.createUser = async (event, cb) => {
  try {
    const data = JSON.parse(event.body);

    if (!data || !data.email || !data.first_name || !data.last_name) {
      const result = error('Invalid details!!', 400);
      return cb(null, response.create(400, result));
    }

    const existUser = await helper.getUserByEmail(data.email);

    if (existUser.Count > 0) {
     // const updateUser = await helper.updateUser(existUser.Items[0].id, data);
     const result = error('Edit disable now.', 400);
     return cb(null, response.create(400, result));
    } else {
      const newUser = await helper.createUser(data);
      if (newUser) {
        const user = await helper.getUserByEmail(data.email);
        const result = success('Ok', user.Items[0], 200);
        return cb(null, response.create(201, result));
      } else {
        const result = error(err, 500);
        return cb(null, response.create(500, result));
      }
    }
  } catch (err) {
    const result = error(err.message, 500);
    return cb(null, response.create(500, result));    
  }
};

module.exports.getUserDetail = async (event, cb) => {
  try {
    if (!event.headers.Authorization) {
      const result = error('You are not Authorized!', 401);
      return cb(null, response.create(401, result));
    }
    var decoded = jwt_decode(event.headers.Authorization);

    const user = await helper.getUserByUsername(decoded.username);
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
module.exports.sms = async(event, cb) =>{

  const sms = await helper.sms();
  const result = error(sms, 200);
  console.log(result);
  return cb(null, response.create(200, result));

};
module.exports.loginUser = async (event, cb) => {
  try {
    if (!event.headers.Authorization) {
      const result = error('You are not Authorized!', 401);
      return cb(null, response.create(401, result));
    }
    const data = JSON.parse(event.body);

    if (!data || !data.email) {
      const result = error('Invalid details!!', 400);
      return cb(null, response.create(400, result));
    }

    const existUser = await helper.getUserByEmail(data.email);

    if (existUser.Count > 0) {
      if (data.username) {
        const result = success('Ok', existUser.Items, 200);
        return cb(null, response.create(201, result));
      } else {
        const result = success('Ok', existUser.Items[0], 200);
        return cb(null, response.create(201, result));
      }
    } /*else {
      const newUser = await helper.createUser(data);
        if (newUser) {
          const user = await helper.getUserByEmail(data.email);
          const result = success('Ok', user.Items[0], 200);
          return cb(null, response.create(201, result));
        } else {
          const result = error(err, 500);
          return cb(null, response.create(500, result));
        }
    }*/
  } catch (err) {
    const result = error(err.message, 500);
    return cb(null, response.create(500, result));
    console.log(err);
  }
};