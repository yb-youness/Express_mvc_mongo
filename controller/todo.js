const { check, validationResult } = require("express-validator");
const Todos = require("../model/Todos");

//! fetch All
// @desc      fetch  All Todo
// @route     get /
// @accsess   Public
exports.getTodo = async (req, res, next) => {
  let data = null;
  try {
    data = await Todos.find().lean();
  } catch (err) {
    console.log(err.msg);
  }

  //res.send("get all todo");
  res.render("index", { data: data, title: " Home" });
};

//! Insert
// @desc      Add Todo
// @route     Post /add
// @accsess   Public
exports.addTodo = async (req, res, next) => {
  const errors = validationResult(req); // Validate Using Express Validator
  let data, msg;
  if (!errors.isEmpty()) {
    console.log(errors.array());
    //res.render("index", { errors: errors.array() });
  } else {
    // Insert To Mongo Db Using The Model
    const CTodo = await Todos.create(req.body);
    msg = "Recored Added Whith Sucsess !";
  }
  // Get all recordes
  try {
    data = await Todos.find().lean();
  } catch (err) {
    console.log(err.msg);
  }

  //res.send("get all todo");

  //  Bind The Records

  // Send msg
  res.render("index", {
    data: data,
    errors: errors.array(),
    msg: msg,
    title: " Home",
  });
};

//! Update The State Of The Todo
// @desc      togle Todo
// @route     get /:id
// @accsess   Public
exports.Togletodo = async (req, res, next) => {
  console.log(req.params.id);
  const todo = await Todos.findById(req.params.id);
  let status = !todo.status;
  const Uptodo = await Todos.findByIdAndUpdate(req.params.id, {
    status: status,
  });

  res.redirect("/");
};

//! Delete Todo
// @desc       Delete A Todo From the Database
// @route      delet del/:id
// @accsess   Public
exports.DeleteTodo = async (req, res, next) => {
  const Todo = await Todos.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
