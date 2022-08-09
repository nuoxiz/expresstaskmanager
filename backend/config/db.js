const mongoose = require("mongoose");
require("dotenv").config();
/**
 * @desc Connect to MongoDB cluster
 * @acess private
 */

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    // print output
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
