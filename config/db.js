
const mongoose = require("mongoose");



  const DBURL=process.env.MONGO_URI
  
  
  
  async function connectDB() {
    try {
      await mongoose.connect(DBURL);
     
      console.log(" MongoDB Connected Successfully");
    } catch (error) {
      console.error(" MongoDB Connection Failed:", error.message);
      process.exit(1);
    }
  };

module.exports = connectDB;