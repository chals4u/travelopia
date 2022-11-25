const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    name: String,
    description: String,
    status: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);
