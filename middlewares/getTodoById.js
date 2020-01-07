const TodoList = require("../models/TodoList");

module.exports = async (req, _res, next) => {
  const todo = await TodoList.query()
    .where("id", parseInt(req.params.id))
    .withGraphFetched("todo_items");
  req.getTodoByIdResponse = todo[0];
  next();
};
