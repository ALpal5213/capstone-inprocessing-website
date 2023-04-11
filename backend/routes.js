const express = require("express");
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");
const session = require('express-session')
const routePath = express.Router();
const bcrypt = require('bcryptjs');

//Middleware
routePath.use(express.json())
routePath.use(cors());

//Session 
routePath.use(session({
    secret: 'sessionsecret',
    cookie: { maxAge: 300000 },
    saveUninitialized: false
}))

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
    if (request.body.task_name && request.body.due_date && request.body.priority && request.body.task_description) {
        let newTask = request.body

        return knex('Tasks')
            .insert(newTask)
            .then(data => response.status(200).send("Posted"))
            .catch(error => response.status(405).send("Not posted"))
    } else {
        response.status(404).send('Make sure to send: Task Name, Due_date, priority and description')
    }
});

// Post items below are a work-in-progress
routePath.post("/locations", (request, response) => {
    let newLocation = request.body

    return knex('Locations')
        .insert(newLocation)
        .then(data => response.status(200).send("Posted"))
        .catch(error => response.status(405).send("Not posted"))
});

//User Authentication
routePath.post("/login", async function (req, res) {
    if (req.body.username) {
        let { username } = req.body
        let password;
        console.log(username)

        //Authenticate username
        let usernameMatcher = await getUsername(username);
        //Authenticate Password  
        let passwordMatcher = await getPassword(usernameMatcher, password);
        if (usernameMatcher === undefined)
        //User Auth Failed
        {
            console.log("Returning 404"); return res.status(404).send('Wrong Credentials')
        } else
        //User Auth Success
        {
            console.log('\n User Authenticated Successfully! \n')
            let sid = req.sessionID
            req.session.authenticated = true;
            req.session.cookie.path = '/login'
            req.session.session_id = sid

            return knex("Users")
                .where({ username: usernameMatcher, password: passwordMatcher })
                .modify((queryBuilder) => queryBuilder.update({ session_id: sid })).then(() => {
                    console.log(sid)
                    console.log(req.session)
                }).then(data => {
                    return knex
                        .select('*')
                        .from('Users')
                        .where({ username: usernameMatcher, password: passwordMatcher }).then(data => {
                            console.log(data)
                            req.session.user_id = data[0].id
                            req.session.username = data[0].username
                            req.session.password = data[0].password
                            req.session.first_name = data[0].first_name
                            req.session.last_name = data[0].last_name
                            return res.json(req.session)
                        })
                })
        }
    } else { //Inputed Username or Password Invalid Not truthy; Auth Failed
        return res.status(404).send('Wrong Credentials')
    }
});

/* PATCH ********************************************************************/

//Patch Tasks by Task Id --- User Perspective
routePath.patch("/tasks/:id", (request, response) => {
    let id = request.params.id;
    let changes = request.body;

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

routePath.delete("/users/:id", (request, response) => {
    let id = request.params.id;

    return knex('Users')
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

//Helper Functions
const getUsername = async (username) => {
    let usernameMatcher;
    return knex('Users')
        .where({ username: username })
        .then(data => {
            console.log(data)
            console.log("INPUTED USERNAME: " + username)
            console.log("MATCHED USERNAME to database Username: " + data[0])
            if (typeof (data[0].username) === undefined) {
                usernameMatcher = undefined;
                return usernameMatcher;
            } else if (data[0].username === username)
                usernameMatcher = username
            console.log('Username Match Success:' + usernameMatcher)
            return usernameMatcher;
        })
        .catch((err) => {
            console.log(err);
        })
}

const getPassword = async (usernameMatcher, password) => {


    return knex
        .select("password")
        .from('Users')
        .where("username", usernameMatcher)
        .then(data => {
            console.log(data)
            password = data[0].password
            console.log('Password Match Success:' + password)
            return password;
        })
        .catch((err) => {
            console.log(err);
        })
}
