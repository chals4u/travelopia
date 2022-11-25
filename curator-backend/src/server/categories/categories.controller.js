const { error, success } = require('../../helpers/apiResponse');
const Categories = require("./categories.model");
const jwt_decode = require("jwt-decode");
const {connectToDatabase} = require("../../db/db");
const { auth } = require('../middleware/Auth');
const helper = require('./helper');
const response = require('../../helpers/response');


/*exports.getCategories = async () => {
    try {
      const db = connectToDatabase();
      let result = {};
      //var decoded = jwt_decode(token);
  
      if (db) {

        const existCategories = await Categories.find({});
        
        if (existCategories) {
          result = {
            status: true,
            code: 200,
            user: existCategories,
          };
        } else {
          result = {
            status: false,
            code: 404,
            error: "Categories doesn't exist",
          };
        }
      } else {
        result = {
          status: false,
          code: 400,
          error: "Db does not exist",
        };
      }
      return result;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error: error.message,
      };
    }
  };*/
  

  
module.exports.getCategories = async(event,cb)=>{
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
    const categories = await helper.getCategories();
    
    if (categories.Count > 0) {      
      const result = success('Ok', categories.Items, 200);
     return cb(null, response.create(200, result));
    } else {
      const result = error("Not found", 404);
     return cb(null, response.create(404,result));
    }
  } catch (err) {
    console.log(err);
    const result = error(err.message, 500);
    return cb(null, response.create(500,result));
     return err;
  }
}


exports.deleteCategories = async (event,cb) => {
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
    //const data = JSON.parse(event);
    console.log(event.pathParameters.id);
    const deleteCategories = await helper.deleteCategories(event.pathParameters.id);
    const result = success('Ok', deleteCategories, 200);
    return cb(null, response.create(200,result));
  } catch (err) {
    const result = error(err.message, 500);
    return cb(null, response.create(500,result));
  }
};

module.exports.createCategories = async (event, cb) => {
  try {

    /*if (!event.headers.Authorization) {
      const result = error('You are not Authorized!', 401);
      return cb(null, response.create(401, result));
    }
    const response_ = await auth(event.headers.Authorization);
    if(!response_){
      const result = error(response_.error, response_.code);
     return cb(null, response.create(401, result));
    }*/

    const data = JSON.parse(event.body);
    let newCategories;
      if(typeof data.id !== 'undefined'&& data.id!=''){
        const categoriesDetails = await helper.getCategoriesById(data.id) 
        if(categoriesDetails.Count > 0){
          newCategories = await helper.updateCategories(data.id,data.details);
        }      
      }else{
        newCategories = await helper.saveCategories(data);
      }
      
      if (newCategories) {
        const result = success('Ok', newCategories, 200);
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