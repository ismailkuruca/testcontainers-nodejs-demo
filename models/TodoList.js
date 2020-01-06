const { Model } = require('objection');
const knex = require('../db/knex')

Model.knex(knex)

class TodoList extends Model {
  static get tableName() {
    return 'todo_list';
  }

  static get relationMappings() {
      const TodoItem = require('./TodoItem')
      return {
          todo_items: {
              relation: Model.HasManyRelation,
              modelClass: TodoItem,
              join: {
                  from: 'todo_list.id',
                  to: 'todo_items.todo_list_id'
              }
          }
      }
  }
}

module.exports = TodoList;