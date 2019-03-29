const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

// HELPER FUNCTIONS
module.exports = {
  getProjects,
  getProject,
  addProject
};

function getProjects() {
  return db("projects");
}

function getProject(id) {
  return db("projects")
    .select(
      "projects.id",
      "projects.name",
      "projects.description",
      "projects.completed"
    )
    .where({ "projects.id": id });
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .into("projects");
}
