const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const answerSchema = new Schema(
    {
      user_id: String,
      question_id: String,
      categories_id: String,
      date: String,
      time: String,    
      answer: String,
      created_by: String,
      updated_by: String,
      is_active: Boolean,
    },
    {
      timestamps: true,
    }
  );
  
  module.exports =
    mongoose.models.Wellness || mongoose.model("Answers", answerSchema);
  