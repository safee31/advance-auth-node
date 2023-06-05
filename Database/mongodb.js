const mongoose = require("mongoose");
const { MONGO_URI } = require("../Config");

exports.connectionDB = async () => {
  const uri = MONGO_URI;
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `✔ Database Successfully Connected: ${conn.connection.name}`.yellow.italic
    );
  } catch (error) {
    console.log(`While DB connection => ${error.message || error}`);
  }
};
