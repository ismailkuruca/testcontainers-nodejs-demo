const { Model } = require('objection');
const knex = require('../db/knex')

Model.knex(knex)

class TodoItem extends Model {
  static get tableName() {
    return 'todo_items';
  }
}

module.exports = TodoItem;