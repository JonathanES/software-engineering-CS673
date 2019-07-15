const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../../backend/config/database');

let taskID = 1;
const parentID = 1;
const categoryID = 1;
const userID = 1;
const statusID = 1;
const priorityID = 1;
const taskName = 'Test Task';
const taskInfo = 'Test Task Info';
const expectedDuration = 1;
const actualTimeSpent = 1;

const catIDChange = 2;
const uIDChange = 2;
const sIDChange = 3;
const pIDChange = 3;
const tNameChange = 'New Task Name';
const tInfoChange = 'No Info';
const eDurationChange = 3;
const aTimeSpentchange = 5;


const options = {
    transports: ['websocket'],
    'force new connection': true
};

describe('Testing communication with Tasks table', function () {
    it('Adding a test task', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {
            // Emit event when all clients are connected.

            //Creating and deleting a new task
            client.emit('USER_ADD_TASK', parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, expectedDuration, actualTimeSpent);
            client.on('ADD_TASK', data => {
                client.emit('USER_GET_SINGLETASK', data.insertId);
                client.on('GET_SINGLETASK', taskData => {
                    
                    expect(taskData[0].ParentID).to.equal(parentID);
                    expect(taskData[0].CategoryID).to.equal(categoryID);
                    expect(taskData[0].UserID).to.equal(userID);
                    expect(taskData[0].StatusID).to.equal(statusID);
                    expect(taskData[0].PriorityID).to.equal(priorityID);
                    expect(taskData[0].TaskName).to.equal(taskName);
                    expect(taskData[0].TaskInfo).to.equal(taskInfo);
                    expect(taskData[0].ExpectedDuration).to.equal(expectedDuration);
                    expect(taskData[0].ActualTimeSpent).to.equal(actualTimeSpent);

                    db.query('DELETE FROM Tasks WHERE TaskName = ? ', [taskName], (error) => {
                        if (error) throw error;
                        client.disconnect();
                        done();
                    })
                })
            });
        });
    });

    it('Updating test task\'s status', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_STATUS', taskID, sIDChange);
            client.on('UPDATE_TASK_STATUS', data => {
                expect(data).to.equal(3);
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task\'s priority', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_PRIORITY', taskID, pIDChange);
            client.on('UPDATE_TASK_PRIORITY', data => {
                expect(data).to.equal(3);
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task\'s name', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_NAME', taskID, tNameChange);
            client.on('UPDATE_TASK_NAME', data => {
                expect(data).to.equal('New Task Name');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task\'s info', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_INFO', taskID, tInfoChange);
            client.on('UPDATE_TASK_INFO', data => {
                expect(data).to.equal('No Info');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task\'s expected duration', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_EXPDURATION', taskID, eDurationChange);
            client.on('UPDATE_TASK_EXPDURATION', data => {
                expect(data).to.equal(3);
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task\'s actual time spent', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_ACTTIME', taskID, aTimeSpentchange);
            client.on('UPDATE_TASK_ACTTIME', data => {
                expect(data).to.equal(5);
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task -- marking as deleted', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_ISDELETE', taskID, 'True');
            client.on('UPDATE_TASK_ISDELETE', data => {
                expect(data).to.equal('True');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test task -- marking as valid', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_TASK_ISDELETE', taskID, 'False');
            client.on('UPDATE_TASK_ISDELETE', data => {
                expect(data).to.equal('False');
                client.disconnect();
                done();
            });
        });
    });



});
