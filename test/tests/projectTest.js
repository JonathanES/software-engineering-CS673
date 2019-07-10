const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../../backend/config/database');
const projectController = require('../../backend/controller/projectController');




const userID = 1;
const pID = 1; 
const projectName = 'Test';
const dueDate = '2010-01-01T05:00:00.000Z';
const isDeleted = 'False';

const uIDChange = 2;
const pNameChange = 'New Test Name';
const dDateChange = '2011-01-01T05:00:00.000Z';
const uisDeleted = 'True';


const options = {
    transports: ['websocket'],
    'force new connection': true
};

describe('Testing communication with Projects table', function () {
    it('Adding a test project', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', async function () {
            // Emit event when all clients are connected.

            //Creating and deleting a new task
            client.emit('USER_CREATE_PROJECT', userID, projectName, dueDate);
            
            let pID = await projectController.findProjectID(projectName);

            client.on('CREATE_PROJECT', data => {
                //console.log(data);
                //console.log('Project data length: ',data.length);
                //console.log('Project Name: ',data[data.length-1].projectName)
                expect(data[data.length-1].projectName).to.equal(projectName);
                expect(new Date(data[data.length-1].dueDate).getDate()).to.equal(new Date(dueDate).getDate());
                
                db.query('DELETE FROM ProjectUsers WHERE ProjectID = ? and UserID = ?', [pID, userID], (error) => {
                    if (error) throw error;
                    //client.disconnect();
                })


                db.query('DELETE FROM Projects WHERE ProjectID = ? ', [pID], (error) => {
                    if (error) throw error;
                    client.disconnect();
                    done();
                })
            });
        });
    });

    it('Updating test project\'s name', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_PROJECT_NAME', pID, pNameChange);
            client.on('UPDATE_PROJECT_NAME', data => {
                expect(data).to.equal('New Test Name');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test project\'s name to original', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_PROJECT_NAME', pID, projectName);
            client.on('UPDATE_PROJECT_NAME', data => {
                expect(data).to.equal('Test');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test project\'s due date', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_PROJECT_DUEDATE', pID, dDateChange);
            client.on('UPDATE_PROJECT_DUEDATE', data => {
                expect(data).to.equal('2011-01-01T05:00:00.000Z');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test project\'s due date to original', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_PROJECT_DUEDATE', pID, dueDate);
            client.on('UPDATE_PROJECT_DUEDATE', data => {
                expect(data).to.equal('2010-01-01T05:00:00.000Z');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test project as deleted', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_PROJECT_ISDELETED', pID, uisDeleted);
            client.on('UPDATE_PROJECT_ISDELETED', data => {
                expect(data).to.equal('True');
                client.disconnect();
                done();
            });
        });
    });

    it('Updating test project as active', function (done) {
        // Set up client1 connection
        let client = io.connect(socketUrl, options);

        client.on('connect', function () {

            // Emit event when all clients are connected.
            client.emit('USER_UPDATE_PROJECT_ISDELETED', pID, isDeleted);
            client.on('UPDATE_PROJECT_ISDELETED', data => {
                expect(data).to.equal('False');
                client.disconnect();
                done();
            });
        });
    });
});