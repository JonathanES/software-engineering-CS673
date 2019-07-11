const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../../backend/config/database');

let milestoneID = 1;
const milestoneName = 'Test Milestone';
const nmilestoneName = 'New Test Milestone';
const dueDate = '2011-01-01T05:00:00.000Z';
const projectID = 1;
const isDeleted = 0;


const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Milestones test', function () {

  it('should create a new milestone', function (done) {
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_CREATE_MILESTONE', projectID, milestoneName, dueDate);
      client.on('CREATE_MILESTONE', data => {
        client.emit('USER_GET_MILESTONE', data.insertId);
        client.on('GET_MILESTONE', ress => {
          expect(ress[0].MilestoneName).to.equal('Test Milestone');
          expect(ress[0].IsCompleted).to.equal(isDeleted);
          client.disconnect();
          done();
        })

      });
    });
  });

  it('should rename the milestone', function(done) {
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

        // Emit event when all clients are connected.
        client.emit('USER_UPDATE_MILESTONE_NAME', milestoneID, nmilestoneName);
        client.on('UPDATE_MILESTONE_NAME', data => {
            console.log(data);
            expect(data).to.equal('New Test Milestone');
            client.disconnect();
            done();
        });
    });
    });

  it('should mark completion', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_UPDATE_MILESTONE_COMPLETED',milestoneID, 'true');
      client.on('UPDATE_MILESTONE_COMPLETED', data => {
        expect(data).to.equal('true');
        client.disconnect();
        done();
      });
    });
  });
  it('should reverse milestone completion', function (done) {
      // Set up client1 connection
      let client = io.connect(socketUrl, options);

      client.on('connect', function () {

          // Emit event when all clients are connected.
          client.emit('USER_UPDATE_MILESTONE_COMPLETED',milestoneID, 'false');
          client.on('UPDATE_MILESTONE_COMPLETED', data => {
              expect(data).to.equal('false');
              client.disconnect();
              done();
          });
      });
  });
  });
