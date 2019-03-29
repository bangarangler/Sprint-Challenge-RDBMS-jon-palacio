require("dotenv").config();
const express = require("express");
const knex = require("knex");

const actionRouter = require("../actions/actionRouter.js");
const projectRouter = require("../projects/projectRouter.js");

const db = require("../data/dbConfig.js");
const server = express();

server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

module.exports = server;
