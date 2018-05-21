var express = require("express");
var router = express.Router();

// Require the controller

var ToDoController = require("../../controllers/todos.controller");

// get, post, put, and delete

router.get("/", ToDoController.getTodos);
router.post("/", ToDoController.createTodo);
router.put("/", ToDoController.updateTodo);
router.delete("/:id", ToDoController.removeTodo);

// Export the Router

module.exports = router;
