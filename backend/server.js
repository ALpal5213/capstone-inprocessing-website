const routePath = require("./routes.js");
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json())
app.use(routePath)

app.listen(port, () => console.log(`Server is listening on port ${port}`))