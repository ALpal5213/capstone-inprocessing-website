const express = require("express");
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");

const routePath = express.Router();
routePath.use(cors());

//Controllers




/* GET *******************************************************************/

routePath.get("/", (request, response) => {
    response.status(200).json("success");
});

//Get by table
routePath.get("/table/:table", (request, response) => {
   return knex(request.params.table)
   .select('*')
   .then(data => response.status(200).json(data))
   .catch(error => response.status(405).send("Not a table.\n Select from 'Users', 'Locations', 'Jobs', 'Units', or 'Tasks'"))
});

//Get Table by id
routePath.get("/table/:table/:id", (request, response) => {
    let table = request.params.table;
    let id = request.params.id;

    return knex(table)
        .select('*')
        .where({ id: id })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Not a table or Id does not exist.\n Select from 'Users', 'Locations', 'Jobs', 'Units', or 'Tasks'"))
});

//Get join table and allow order by and limit (optional)
routePath.get("/tasks-locations", (request, response) => {
    return knex('Locations')
        .join('Tasks', 'Locations.id', '=', 'Tasks.location_id')
        .select('*')
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

/* POST *********************************************************************/

routePath.post("/tasks", (request, response) => {
    if(request.body.task_name && request.body.due_date && request.body.priority && request.body.task_description){
        let newTask = request.body
        //{task_name , priority, due_date, task_description}
        return knex('Tasks')
            .insert(newTask)
            .then(data => response.status(200).send("Posted"))
            .catch(error => response.status(405).send("Not posted"))
    } else {
        response.status(404).send('Make sure to send: Task Name, Due_date, priority and description')
    }
});

routePath.post("/locations", (request, response) => {
    let newLocation = request.body
        
    return knex('Locations')
        .insert(newLocation)
        .then(data => response.status(200).send("Posted"))
        .catch(error => response.status(405).send("Not posted"))
});

/* PATCH ********************************************************************/

//Patch Tasks by Task Id --- User Perspective
routePath.patch("/tasks/:id", (request, response) => {
    let id = request.params.id;
    let changes = request.body

    return knex('Tasks')
        .where({ id: id })
        .update(changes)
        .then(data => response.status(200).send("Patched"))
        .catch(error => response.status(405).send("Not patched"))
});


/* DELETE *******************************************************************/

//Delete Table by id
routePath.delete("/tasks/:id", (request, response) => {
    let id = request.params.id;

    return knex('Tasks')
        .where({ id: id })
        .del()
        .then(data => response.status(200).send("Deleted"))
        .catch(error => response.status(405).send("Not Deleted"))
});

/* OTHER ********************************************************************/

//Unauthorized methods to specific endpoints should send back an appropriate error message with the response.
routePath.all('/*', (req, res) => {
    res.status(405).send("Not Authorized");
})

module.exports = routePath;