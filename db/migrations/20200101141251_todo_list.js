
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo_list', t => {
      t.increments('id')
      t.string('creator')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todo_list')
};
