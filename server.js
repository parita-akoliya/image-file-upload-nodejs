const express = require('express');
const bodyParser = require('body-parser');
const config = require('./utils/config')
const configAuth = config.server
const port = configAuth.port
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to IONIC application."
    });
});
require('./app/routes/url.routes.js')(app);
app.listen(port, () => {
    console.log("Server is listening");
});