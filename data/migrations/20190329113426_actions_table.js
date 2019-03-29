exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    // PRIMARY KEY
    tbl.increments();
    // DESCRIPTION REQUIRED
    tbl.string("description", 128).notNullable();
    // NOTES REQUIRED
    tbl.text("notes").notNullable();
    // COMPLETED FLAG
    tbl.boolean("complete");
    // FOREIGN KEY FOR PROJECTS
    tbl
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("projects");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
