const mongoose = require("mongoose");
const connectDb = async () => {
  const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1wbmx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

  // const URI = `mongodb://localhost:27017/${process.env.DB_DATABASE}`;
  try {
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
