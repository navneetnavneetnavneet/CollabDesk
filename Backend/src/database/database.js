const mongoose = require("mongoose");
const config = require("../config/config");

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Database Connection Established");
  } catch (error) {
    console.log("Database Connection Failed !");
  }
};

module.exports = connectDatabase;
