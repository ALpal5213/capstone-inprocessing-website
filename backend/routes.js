const express = require("express");
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");
const session = require('express-session')
const fileUpload = require('express-fileupload');
// const routePath = express.Router();
const routePath = express();
const bcrypt = require('bcryptjs');

//Middleware
routePath.use(express.json())
routePath.use(cors());
routePath.use(fileUpload());
routePath.use(express.static('uploads'))

//Session 
routePath.use(session({
    secret: 'sessionsecret',
    cookie: { maxAge: 300000 },
    saveUninitialized: false
}))


// Upload Endpoint 
// Sends file to a cloud storage service (Google Drive or something else)
// Sends URL of service location to update the file location
routePath.patch('/tasks/upload/:id', (req, res) => {
    // upload to task ID
  let id = req.params.id;

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  console.log(file)

  return knex('Tasks')
    .where({ id: id })
    .update({
        my_file: file
    })
    .then(data => response.status(200).send("Patched"))
    .catch(error => response.status(405).send("Not patched"))
});

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
routePath.get("/tasks-locations/:userID", (request, response) => {
    let id = request.params.userID;
 
    return knex('Locations')
        .join('Tasks', 'Locations.id', '=', 'Tasks.location_id')
        .select('*')
        .where({ user_id: id })
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

routePath.post("/Users", (request, response) => {
    var missingKeyCount = 0;
    const userKeys = ['fullname', 'username', 'password', 'is_admin', 'is_supervisor', 'is_military', 'job_id', 'unit_id']
    userKeys.forEach(key => {if (!Object.keys(request.body).includes(key)) missingKeyCount++});

    if (missingKeyCount === 0) {
      return knex('Users')
      .insert(request.body)
      .then(() => {
        response.status(201).send({response: `added new user`});
      })
      .catch((err) => {
        console.log(err);
        response.send({response: `error adding new user`})
      })
    } else {
      response.send({response: `error adding new user, missing object properties in request body`})
    }
});

routePath.post("/username", async (request, response) => {
  knex('Users')
    .select('username')
    .where({username: request.body.username})
    .then(data => {
      if (data.length > 0) {
        response.send({found: true})
      } else {
        response.send({found: false})
      }
    })
})

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

        //Authenticate username
        let usernameMatcher = await getUsername(username);
        //Authenticate Password  
        let passwordMatcher = await getPassword(usernameMatcher.username, password);
        if (usernameMatcher.username === undefined)
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
                .where({ username: usernameMatcher.username, password: passwordMatcher })
                .modify((queryBuilder) => queryBuilder.update({ session_id: sid })).then(() => {
                  
                }).then(data => {
                    return knex
                        .select('*')
                        .from('Users')
                        .where({ username: usernameMatcher.username, password: passwordMatcher }).then(data => {
                            req.session.user_id = data[0].id
                            req.session.username = data[0].username
                            req.session.password = data[0].password
                            req.session.first_name = data[0].first_name
                            req.session.last_name = data[0].last_name
                            //Only sends hashed password
                            return res.type("json").send({id: usernameMatcher.id ,password: passwordMatcher})
                        })
                })
        }
    } else { //Inputed Username or Password Invalid Not truthy; Auth Failed
        return res.status(404).send('Wrong Credentials')
    }
});



routePath.post("/session", async function (req, res ){
    if (req.body.authenticated){
        res.status(202).json(req.session)
    }
    else{
        req.session.destroy();
        res.status(404).json({"message":"Authentication Failed!"})
    }

})


// Upload Endpoint
routePath.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `http://localhost:3001/${file.name}` });

    });
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
            // console.log(data)
            // console.log("INPUTED USERNAME: " + username)
            // console.log("MATCHED USERNAME to database Username: " + data[0].username)
            if (typeof (data[0].username) === undefined) {
                // console.log(usernameMatcher)
                usernameMatcher = undefined;
                return usernameMatcher;
            } else if (data[0].username === username)
                usernameMatcher = {id: data[0].id ,username: data[0].username}
            // console.log('Username Match Success:' + usernameMatcher.username)
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
            // console.log(data)
            password = data[0].password
            // console.log('Password Match Success:' + password)
            return password;
        })
        .catch((err) => {
            console.log(err);
        })
}
