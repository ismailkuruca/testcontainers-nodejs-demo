const express = require("express");
const router = express.Router();

const getAllTodos = require("../middlewares/getAllTodos");
const getTodoById = require("../middlewares/getTodoById");

router.get("/todos", getAllTodos, (req, res) => {
  res.json(req.getAllTodosResponse);
});

router.get("/todos/:id", getTodoById, (req, res) => {
  res.json(req.getTodoByIdResponse);
});

module.exports = {
  router: router
};
