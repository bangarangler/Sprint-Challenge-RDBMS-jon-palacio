const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const projects = require("./projects-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const project = await projects.getProjects();
    project.map(pr => {
      pr.complete === 0 ? (pr.complete = false) : (pr.complete = true);
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

// GET PROJECT BY ID  LIST PROJECTS AND ACTIONS FOR ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  return db("projects")
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        db("actions")
          .where({ project_id: id })
          .then(actions => {
            project.actions = actions;
            project.complete === 0
              ? (project.complete = false)
              : (project.complete = true);
            res.status(200).json(project);
          });
      } else {
        res.status(404).json({ message: "project not found" });
      }
    });
});

// ADD PROJECT
router.post("/", async (req, res) => {
  try {
    const { name, description, complete } = req.body;
    const project = await { name, description, complete };
    if (!project) {
      return res.status(404).json({ message: "No Project found for ID" });
    } else {
      const prj = await projects.addProject(project);
      res.status(201).json(prj);
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

// UPDATE PROJECT
router.put("/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    const count = await projects
      .getProjects()
      .where({ id })
      .update(changes);
    const project = await projects.getProjects().where({ id });
    return count
      ? res.status(200).json(project)
      : res.status(404).json({ message: "Project not found for that ID" });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await projects
      .getProjects()
      .where({ id })
      .del();
    return count
      ? res.status(200).json(count)
      : res
          .status(404)
          .json({ message: "No projet found to delete at that ID" });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
