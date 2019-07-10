// express, package used for the creation of the server
const express = require('express');
// socket.io, package used for real time web application
const socket = require('socket.io');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// creation of the server, server is running on port 8080
const server = app.listen(8000, function(){
    console.log('server is running on port 8000')
});
// creation of the constant that will be used for the socket
const io = socket(server);
require('./backend/socket/handler/handler.js')(io);


module.exports = {
    io: io,
    server: server
};


