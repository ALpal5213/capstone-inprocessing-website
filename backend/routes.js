const express = require("express");
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");

const routePath = express.Router();
routePath.use(cors());

routePath.get("/", (request, response) => {
    response.status(200).json("success");
});

routePath.get("/table/:table", (request, response) => { 

  return  knex(request.params.table)
    .select('*')
    .then(data => response.status(200).json(data))
    .catch(error => response.status(405).send("Not a table.\n Select from 'Users', 'Locations', 'Jobs', 'Units', or 'Tasks'"))
});



  
//Unauthorized methods to specific endpoints should send back an appropriate error message with the response.
routePath.all('/*', (req, res) => {
    res.status(405).send("Not Authorized");
})
  
  




module.exports = routePath;