const express = require("express");
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");

const routePath = express.Router();
routePath.use(cors());

routePath.get("/", (request, response) => {
    response.status(200).json("success");
});

module.exports = routePath;