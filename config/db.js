const mongoose = require("mongoose");

const ConnectDb = async () => {
  const uri = process.env.URI || "mongodb://localhost/todos";
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`DB Connected  ${conn.connection.host}`);
};

module.exports = ConnectDb;
