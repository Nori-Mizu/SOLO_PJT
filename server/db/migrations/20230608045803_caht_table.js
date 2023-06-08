exports.up = function (knex) {
  return knex.schema.createTable("chat2_table", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("message").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("chat2_data");
};
