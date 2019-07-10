/// Issues Test File - Tests issues table in the database and associated files ///
/// CONSTANTS /// - These should really be capitcal camel case
const assert = require("chai").assert;
const io = require("socket.io-client");
const server = require("../../server.js")
const socketUrl = "127.0.0.1:8000"
const db = require("../../backend/config/database")
const moment = require("moment")

const options = {
    transports: ['websocket'],
    'force new connection': true
};
