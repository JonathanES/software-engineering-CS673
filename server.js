// express, package used for the creation of the server
const express = require('express');
// socket.io, package used for real time web application
const socket = require('socket.io');

const app = express();

const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
const log_stdout = process.stdout;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// creation of the server, server is running on port 8080
const server = app.listen(8000, function () {
    console.log('server is running on port 8000')
});
// creation of the constant that will be used for the socket
const io = socket(server);
require('./backend/socket/handler/handler.js')(io);


module.exports = {
    io: io,
    server: server
};
