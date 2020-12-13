const mongoose = require("mongoose"); // Mongose to Define The Schema

// Model For  Todos
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Is Require !!"],
    unique: true, //  Todos must not have The Same Name
  },
  description: {
    type: String,
    required: [true, "Description Is Required !!"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});
// Export The Model To Use
module.exports = mongoose.model("Todos", TodoSchema);
