const TodoList = require("../models/TodoList");

module.exports = async (req, _res, next) => {
  const todoList = await TodoList.query();
  req.getAllTodosResponse = todoList;
  next();
};
