exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(tbl) {
    // PRIMARY KEY
    tbl.increments();
    // NAME REQUIRED
    tbl.string("name", 128).notNullable();
    // DESCRIPTION REQUIRED
    tbl.text("description").notNullable();
    // COMPLETED FLAG
    tbl.boolean("complete");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
