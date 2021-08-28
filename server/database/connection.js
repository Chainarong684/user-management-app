const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_ONLINE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB Database Connected ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error Database connection failed : ${err}`);
  }
};

module.exports = connectDB;
