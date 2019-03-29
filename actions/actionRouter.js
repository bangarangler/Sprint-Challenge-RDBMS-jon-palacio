const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const actions = require("./actions-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

// GET ALL ACTIONS
router.get("/", async (req, res) => {
  try {
    const action = await actions.getActions();
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: "Internal Error", err });
  }
});

// GET ACTION BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await actions.getActions(id).where({ id });
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "No Action found by that ID" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Error", err });
  }
});

// ADD ACTION
router.post("/", async (req, res) => {
  try {
    const { description, notes, complete, project_id } = req.body;
    const action = await { description, notes, complete, project_id };
    if (!action) {
      return res.status(404).json({ message: "No action found for ID" });
    } else {
      const act = await actions.addAction(action);
      res.status(201).json(act);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Error", err });
  }
});

// UPDATE ACTION
router.put("/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    const count = await actions
      .getActions()
      .where({ id })
      .update(changes);
    const action = await actions.getActions().where({ id });
    return count
      ? res.status(200).json(action)
      : res.status(404).json({ message: "No action found for that ID" });
  } catch (err) {
    res.status(500).json({ message: "Internal Error", err });
  }
});

// DELETE ACTION
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await actions
      .getActions()
      .where({ id })
      .del();
    return count
      ? res.status(200).json(count)
      : res.status(404).json({ message: "No Action found to delete at ID" });
  } catch (err) {
    res.status(500).json({ message: "Internal Error", err });
  }
});

module.exports = router;
