require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const uri = process.env.MONGO_URI;

exports.connectToDatabase = () => {
  try {
    mongoose.connect(`${uri}`);

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection Error:"));
    db.once("open", () => {
      console.log("MONGO: successfully connected to db");
    });
    return db;
  } catch (error) {
    console.log("***************** ERROR *****************", error);
  }
};
// connectToDatabase().catch((error) =>
//   console.log("***************** ERROR *****************", error)
// );
