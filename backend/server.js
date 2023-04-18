const routePath = require("./routes.js");
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json())
app.use(routePath)

const { fileCreateDownloads, fileCreateUploads } = require("./FileManipulation.js")


app.listen(port, () => {
    //File Creation For Each user!
    fileCreateDownloads().then(() => fileCreateUploads()).then(() => console.log(`Server is listening on port ${port}`));

})