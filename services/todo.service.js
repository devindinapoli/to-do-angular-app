// Accessing the mongoose mondel

var ToDo = require("../models/todo.model");

// saving context of module
_this = this;

// function to get the list

exports.getTodos = async function(query, page, limit) {
  // Options for mongoose paginate

  var options = {
    page,
    limit
  };

  // Try Catch to handle error

  try {
    var todos = await ToDo.paginate(query, options);

    // Return the list of todos by the promise

    return todos;
  } catch (err) {
    // Return error message

    throw Error("Error while fetching todos");
  }
};

exports.createTodo = async function(todo) {
  // Create new object by using new keyword

  var newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  });

  try {
    // Save todo

    var savedTodo = await newTodo.save();

    return savedTodo;
  } catch (err) {
    // return error message

    throw Error("Error while creating todo");
  }
};

exports.updateTodo = async function(todo) {
  var id = todo.id;

  try {
    // Find list item by Id

    var oldTodo = await ToDo.findbyId(id);
  } catch (err) {
    throw Error("Error while finding the toDo Item");
  }

  // if no list item exits, return false

  if (!oldTodo) {
    return false;
  }

  console.log(oldTodo);

  // Edit the Object

  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  console.log(oldTodo);

  try {
    var savedTodo = await oldTodo.save();
    return savedTodo;
  } catch (err) {
    throw Error("Error occured while updating");
  }
};
