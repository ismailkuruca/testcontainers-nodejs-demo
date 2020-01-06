
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo_items', t => {
      t.increments('id')
      t.string('content')
      t.integer('todo_list_id').references('id').inTable('todo_list')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todo_items')
};
