const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const QuestionsSchema = new Schema(
  {
    categories_id: String,
    Question: String,
    answer_type:String,
    answer: Array, 
    created_by: String,
    updated_by: String,
    is_active: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Questions || mongoose.model("Questions", QuestionsSchema);
