const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // STOP server if DB fails
  }
};

module.exports = connectDatabase;
