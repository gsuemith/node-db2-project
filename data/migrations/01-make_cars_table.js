// DO YOUR MAGIC
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.string('vin', 32).unique().notNullable();
    tbl.string('make', 32).notNullable();
    tbl.string('model', 32).notNullable();
    tbl.integer('mileage').notNullable();
    tbl.string('title', 64)
    tbl.string('transmission', 64)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
}