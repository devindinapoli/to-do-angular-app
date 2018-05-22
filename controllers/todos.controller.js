// Access CRUD service

var TodoService = require("../services/todos.service");

// saving module inside _this

_this = this;

exports.getTodos = async function(req, res, next) {
  // Check query parameters, if none, set to default a value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var todos = await TodoService.getTodos({}, page, limit);

    // Return with appropriate HTTP status

    return res
      .status(200)
      .json({ status: 200, data: todos, message: "Success!" });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.createTodo = async function(req, res, next) {
  // req.body contains the submitted values

  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };

  try {
    // Call service function from req.body

    var createdTodo = await TodoService.createTodo(todo);
    return res
      .status(201)
      .json({ status: 201, data: createdTodo, message: "Success!" });
  } catch (err) {
    // Return Error code & message

    return res.status(400).json({ status: 400, message: "Creation Error!" });
  }
};

exports.updateTodo = async function(req, res, next) {
  // Update MUST have Id

  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: "No Id Found!" });
  }

  var id = req.body._id;

  console.log(req.body);

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  };

  try {
    var updatedTodo = await TodoService.updateTodo(todo);
    return res
      .status(200)
      .json({ status: 200, data: updatedTodo, message: "Success!" });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.removeTodo = async function(req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await TodoService.deleteTodo(id);
    return res.status(204).json({ status: 204, message: "Deleted!" });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};
