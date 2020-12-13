const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// Req The Controller
const {
  getTodo,
  Togletodo,
  addTodo,
  DeleteTodo,
} = require("../controller/todo");
// Routes
// Mount The Controller To  A sepcefique route

router
  .route("/")
  .get(getTodo)
  .post(
    [
      check("title", "Title Is Require").not().isEmpty(),
      check("description", "Description  Is Required").not().isEmpty(),
    ],
    addTodo
  );
router.route("/del/:id").get(DeleteTodo);
router.route("/up/:id").get(Togletodo);

module.exports = router;
