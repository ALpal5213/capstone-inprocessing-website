const express = require("express");
const cors = require("cors");
const session = require('express-session')
const fileUpload = require('express-fileupload');
// const routePath = express.Router();
const routePath = express();
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
//CSV Downloading
const { promisify } = require('util');
const stream = require('stream');
const copyFrom = require('pg-copy-streams').from;
const pipeline = promisify(stream.pipeline);
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const { attachToStreamCSV } = require('knex-to-csv');
attachToStreamCSV();
const fs = require('fs')

//Middleware
routePath.use(express.json())
routePath.use(cors());
routePath.use(fileUpload());
routePath.use(express.static('user_files'))
//Session 
routePath.use(session({
    secret: 'sessionsecret',
    cookie: { maxAge: 3000000 },
    saveUninitialized: false
}))

/* GET *******************************************************************/

routePath.get("/", (request, response) => {
    response.status(200).json("success");
});

//Get by table
routePath.get("/table/:table", (request, response) => {
    let table = request.params.table
    let fields

    if (table === 'Users') {
        fields = ['id', 'fullname', 'username', 'role_id', 'is_admin', 'is_supervisor', 'is_leadership', 'is_military', 'job_id', 'unit_id', 'session_id', 'file_id', 'preferredTheme']
    } else {
        fields = '*'
    }
    return knex(table)
        .select(fields)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Not a table.\n Select from 'Users', 'Locations', 'Jobs', 'Units', or 'Tasks'"))
});

//Get Table by id
routePath.get("/table/:table/:id", (request, response) => {
    let table = request.params.table;
    let id = request.params.id;

    let fields

    if (table === 'Users') {
        fields = ['id', 'fullname', 'username', 'role_id', 'is_admin', 'is_supervisor', 'is_leadership', 'is_military', 'job_id', 'unit_id', 'session_id', 'file_id', 'preferredTheme']
    } else {
        fields = '*'
    }

    return knex(table)
        .select(fields)
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
        .then(data => {
            data.sort((a, b) => {
                let fa = a['due_date'], fb = b['due_date'];
                if (fa < fb) return -1;
                if (fa > fb) return 1;
                return 0;
            });
            response.status(200).json(data)
        })
        .catch(error => response.status(405).send("Could not get"))
});

//Get join table and allow order by and limit (optional)
routePath.get("/tasks-users", (request, response) => {
    let id = request.params.userID;

    return knex('Tasks')
        .join('Users', 'Tasks.user_id', '=', 'Users.id')
        .select('Tasks.id as task_id', 'Tasks.user_id', 'Users.fullname', 'Tasks.task_name', 'Tasks.task_description', 'Tasks.priority', 'Tasks.task_type', 'Tasks.mil_or_civ', 'Tasks.due_date', 'Tasks.status', 'Tasks.task_url', 'Tasks.has_upload', 'Tasks.has_download')
        .then(data => {
            data.sort((a, b) => { return a.task_id - b.task_id });
            response.status(200).json(data)
        })
        .catch(error => response.status(405).send("Could not get"))
});

//Get join table that returns a list of subordinate based on a passed in supervisor user id
routePath.get("/supervisor/:id", (request, response) => {
    let id = request.params.id;

    return knex('Manage')
        .join('Users', 'Manage.user_id', '=', 'Users.id')
        .select('Manage.id', 'Manage.user_id as subordinate_id', 'Users.fullname')
        .where({ supervisor_id: id })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

//Get that returns a list of all supervisors
routePath.get("/supervisors", (request, response) => {
    return knex('Users')
        .select('id', 'fullname')
        .where({ is_supervisor: true })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

//Get join table that returns a list of squadron members based on a passed in commander user id
routePath.get("/commander/:id", (request, response) => {
    let id = request.params.id;

    return knex('Manage')
        .join('Users', 'Manage.user_id', '=', 'Users.id')
        .select('Manage.id', 'Manage.user_id as unitMemberId', 'Users.fullname', 'Users.unit_id')
        .where({ commander_id: id })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

//Get that returns a list of all commanders
routePath.get("/leadership", (request, response) => {
    return knex('Users')
        .select('id', 'fullname')
        .where({ is_leadership: true })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

//Get that returns a list of all leadership based on a passed in unit
routePath.get("/leadership/:unit_id", (request, response) => {
    let unit_id = request.params.unit_id;
    return knex('Users')
        .select('id', 'fullname', 'unit_id')
        .where({ is_leadership: true, unit_id: unit_id })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

//Get that returns a list of all supervisors based on a passed in unit
routePath.get("/supervisors/:unit_id", (request, response) => {
    let unit_id = request.params.unit_id;
    return knex('Users')
        .select('id', 'fullname', 'unit_id')
        .where({ is_supervisor: true, unit_id: unit_id })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});

//get that returns a list of unit members based on a passed in unit
routePath.get("/members/:unit_id", (request, response) => {
    let unit_id = request.params.unit_id;
    return knex('Users')
        .select('id', 'fullname', 'unit_id')
        .where({ unit_id: unit_id })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Could not get"))
});










//Download CSV of a Table to backend directory
routePath.get("/force-export/:user_id/:file_id/:session_id/:table", async (request, response) => {
    console.log(request.params)
    if (request.params.table && request.params.file_id && request.params.user_id) {

        let session_id = request.params.session_id
        let table = request.params.table
        let user_id = request.params.user_id
        let file_id = request.params.file_id
        let filename = request.params.filename

        let fakeString = faker.datatype.string()

        const file = `./user_files/downloads/${user_id}_${file_id}/csv/${table}_export.csv`;



        csvWriter = fs.createWriteStream(file);
        knex.select().from(table).toStreamCSV(csvWriter)
            .then(() => {
                console.log("Export Successful")
                return response.status(202).download(file)
            })
            .catch(e => {
                console.log(e)
                response.status(404).send('Not Table')
            })

    } else {

        response.status(404).send('Not Valid Parameters')
    }

})









//Get Table ids and fullname (oriented for Users table)
routePath.get("/allids/:table", (request, response) => {
    let table = request.params.table;


    console.log(request.params)


    return knex
        .select("id", "fullname")
        .from(table)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Not a table or Id does not exist.\n Select from 'Users', 'Locations', 'Jobs', 'Units', or 'Tasks'"))
});


//Get all Table ids and fullname
routePath.get("/uberids/:table", (request, response) => {
    let table = request.params.table;


    console.log(request.params)


    return knex
        .select("id")
        .from(table)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(405).send("Not a table or Id does not exist.\n Select from 'Users', 'Locations', 'Jobs', 'Units', or 'Tasks'"))
});














//Get Downloads Directory Information pertaining to user
routePath.get("/downloads/:user_id/:file_id/:filetype", async (request, response) => {
    if (request.params.user_id !== undefined && request.params.file_id !== undefined && request.params.filetype !== undefined) {
        let filetype = request.params.filetype
        let user_id = request.params.user_id
        let file_id = request.params.file_id

        const testFolder = `./user_files/downloads/${user_id}_${file_id}/${filetype}`;



        fs.readdir(testFolder, (err, files) => {
            // let fileNames = [];

            // files.forEach(file => {
            //     fileNames.push(file);
            // });    
            response.status(202).json({ "files": files })
        });


    } else { response.status(404).json({ "message": "Not Found" }) }

})











//Download a file.
routePath.get("/force-download/:user_id/:file_id/:filetype/:filename", async (request, response) => {
    if (request.params.user_id !== undefined && request.params.file_id !== undefined && request.params.filetype !== undefined && request.params.filename !== undefined) {

        let filetype = request.params.filetype
        let user_id = request.params.user_id
        let file_id = request.params.file_id
        let filename = request.params.filename

        const file = `./user_files/downloads/${user_id}_${file_id}/${filetype}/${filename}`;
        response.download(file); // Set disposition and send it.

    }

}
)















//Import a CSV table
routePath.get("/force-import/:user_id/:file_id/:session_id/:table", async (request, response) => {
    let session_id = request.params.session_id
    let table = request.params.table
    let user_id = request.params.user_id
    let file_id = request.params.file_id
    let filename = request.params.filename
    console.log(request.params)
    let data = await knex("Users")
        .where({ session_id: session_id, is_admin: true }).then(data => {
            if (data.length === 0) {
                response.status(404).send("Invalid Admin Credentials")
            } else {

                return data[0]
            }
        })

    if (data.is_admin === true) {



        async function copyToTable(txOrKnex, tableName, readableStream) {
            const client = await (txOrKnex.trxClient || txOrKnex.client).acquireConnection();
            await pipeline(
                readableStream,
                client.query(copyFrom(`COPY "${tableName}" FROM STDIN WITH (FORMAT csv)`)),
            );
        }

        let fakeString = faker.datatype.string()
        knex.transaction(async (tx) => {
            const fileStream = fs.createReadStream(`./user_files/downloads/${user_id}_${file_id}/csv/${table}_export.csv`);
            const file = `./user_files/downloads/${user_id}_${file_id}/csv/${table}${fakeString}_export.csv`;
            await copyToTable(tx, `${table}`, fileStream);

            // const stringStream = stream.Readable.from(stringContainingCsvData);
            // await copyToTable(tx, 'Users', stringStream);




        }).then(() => response.status(202).download(file)).catch(response.status(404).json({ "message": 'There was an issue with CSV file you tried to merge' }));


    }

})









/* POST *********************************************************************/

routePath.post("/tasks", (request, response) => {
    if (request.body.task_name && request.body.due_date && request.body.priority && request.body.task_description) {
        let newTask = request.body
        return knex('Tasks')
            .insert(newTask)
            .then(data => (response.status(200).send("Posted")))
            .catch(error => response.status(405).send("Not posted"))
    } else {
        response.status(404).send('Make sure to send: Task Name, Due_date, priority and description')
    }
});

// routePath.post("/newtasks:id", (request, response) => {
//     if (request.body.task_name && request.body.due_date && request.body.priority && request.body.task_description) {
//         let newTask = request.body
//         return knex('Tasks')
//             .insert(newTask)
//             .then(data => (response.status(200).send("Posted")))
//             .catch(error => response.status(405).send("Not posted"))
//     } else {
//         response.status(404).send('Make sure to send: Task Name, Due_date, priority and description')
//     }
// });



routePath.post("/Users", (request, response) => {
    var missingKeyCount = 0;
    const userKeys = ['fullname', 'username', 'password', 'is_admin', 'is_supervisor', 'is_military', 'job_id', 'unit_id',]
    userKeys.forEach(key => { if (!Object.keys(request.body).includes(key)) missingKeyCount++ });

    if (missingKeyCount === 0) {
        return knex('Users')
            .insert(request.body)
            .returning('id')
            .then((id) => {
                response.status(201).send({ response: `added new user`, id: id[0].id });
            })
            .catch((err) => {
                console.log(err);
                response.send({ response: `error adding new user` })
            })
    } else {
        response.send({ response: `error adding new user, missing object properties in request body` })
    }
});

routePath.post("/Manage", (request, response) => {
    var missingKeyCount = 0;
    //user_id, supervisor_id, commander_id
    const userKeys = ['user_id', 'supervisor_id', 'commander_id']
    userKeys.forEach(key => { if (!Object.keys(request.body).includes(key)) missingKeyCount++ });

    if (missingKeyCount === 0) {
        return knex('Manage')
            .insert(request.body)
            .then(() => {
                response.status(201).send({ response: `added new manage entry` });
            })
            .catch((err) => {
                console.log(err);
                response.send({ response: `error adding new manage entry` })
            })
    } else {
        response.send({ response: `error adding new manage entry, missing object properties in request body` })
    }
});

routePath.post("/username", async (request, response) => {
    knex('Users')
        .select('username')
        .where({ username: request.body.username })
        .then(data => {
            if (data.length > 0) {
                response.send({ found: true })
            } else {
                response.send({ found: false })
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
                            return res.type("json").send({ id: usernameMatcher.id, password: passwordMatcher })
                        })
                })
        }
    } else { //Inputed Username or Password Invalid Not truthy; Auth Failed
        return res.status(404).send('Wrong Credentials')
    }
});



routePath.post("/session", async function (req, res) {
    if (req.body.authenticated) {
        req.session.session_id = req.sessionID
        let sid = req.sessionID
        knex('Users')
            .where({ id: req.body.id })
            .modify((queryBuilder) => queryBuilder.update({ session_id: sid })).then(data => {
                console.log(`Session_id for user of id ${req.body.id} has been changed to:  ${sid}`)
            }).then(() => {
                return knex.select('is_admin')
                    .from('Users')
                    .where({ id: req.body.id }).then(data => {

                        return data[0]
                    }).then(data => {
                        console.log(data);
                        return res.status(202).json({ "message": "Session Id Modified at database!", "user_id": req.body.id, "is_admin": data.is_admin, ...req.session })
                    })
            })
    }
    else {
        req.session.destroy();
        res.status(404).json({ "message": "Authentication Failed!" })
    }

})



// // Upload Endpoint
// routePath.post('/upload', (req, res) => {
//     if (req.files === null) {
//         return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     const file = req.files.file;

//     file.mv(`${__dirname}/uploads/${file.name}`, err => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//         }

//         res.json({ fileName: file.name, filePath: `http://localhost:3001/${file.name}` });

//     });
// });

//Session Id Authentication 
routePath.get("/sessionId/:sid", async (request, response) => {
    let sid = request.params.sid
    console.log(sid)
    return await knex.select('session_id')
        .from('Users')
        .where({ session_id: sid })
        .then(data => response.status(200).json({ "message": "true" }))
        .catch(error => response.status(405).json({ "message": "false" }))
});




// Upload Endpoint
routePath.post('/import-table/:user_id/:file_id/:fileName/:table', async (req, res) => {

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    console.log(req.files)
    let user_id = req.params.user_id
    let file_id = req.params.file_id

    let fileName = req.params.fileName
    let table = req.params.table

    const file = req.files.file;

    file.mv(`./user_files/downloads/${user_id}_${file_id}/csv/${fileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {




            async function copyToTable(txOrKnex, table, readableStream) {
                const client = await (txOrKnex.trxClient || txOrKnex.client).acquireConnection();
                await pipeline(
                    readableStream,
                    client.query(copyFrom(`COPY "${table}" FROM STDIN WITH (FORMAT csv)`)),
                );
            }


            knex.transaction(async (tx) => {
                const fileStream = fs.createReadStream(`./user_files/downloads/${user_id}_${file_id}/csv/${fileName}`);
                const filem = `./user_files/downloads/${user_id}_${file_id}/csv/${fileName}`;
                await copyToTable(tx, table, fileStream);


                // const stringStream = stream.Readable.from(stringContainingCsvData);
                // await copyToTable(tx, 'Users', stringStream);




            }).catch((err) => { console.log(err); res.status(404).send(err) }).then(() => res.status(202).json({ "message": "Import Successful" }))


        }
    })


    // res.json({ fileName: file.name, filePath: `http://localhost:3001/downloads/${user_id}_${file_id}/${filetype}/${fileName}` });

})








// Upload Endpoint
routePath.post('/upload/:user_id/:file_id/:filetype/:fileName', (req, res) => {

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    console.log(req.files)
    let user_id = req.params.user_id
    let file_id = req.params.file_id
    let filetype = req.params.filetype
    let fileName = req.params.fileName

    const file = req.files.file;

    file.mv(`${__dirname}/user_files/downloads/${user_id}_${file_id}/${filetype}/${fileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `http://localhost:3001/downloads/${user_id}_${file_id}/${filetype}/${fileName}` });

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
        .then(data => { console.log(data); response.status(200).send("Patched") })
        .catch(error => response.status(405).send(error))
});

//Patch User prefferedTheme by User Id

routePath.patch("/table/Users/:id", (request, response) => {
    let id = request.params.id;
    let changes = request.body;

    return knex('Users')
        .where({ id: id })
        .update(changes)
        .then(data => response.status(200).send("Patched"))
        .catch(error => response.status(405).send(error))
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
                usernameMatcher = { id: data[0].id, username: data[0].username }
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
