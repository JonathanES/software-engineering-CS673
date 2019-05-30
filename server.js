const express = require('express');
var socket = require('socket.io');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

const io = socket(server);
require('./backend/socket/handler/handler.js')(io);

module.exports = io;


