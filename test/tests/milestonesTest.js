const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../../backend/config/database');

let milestoneID = 1;
const milestoneName = 'Test Milestone';


const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Milestones test', function () {

  it('should create a new milestone', function(done) {
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_CREATE_MILESTONE', projectID, milestoneID, milestoneName, date);
      client.on('CREATE_MILESTONE', data => {
        testMilestoneID = data.milestoneID;
        expect(data.milestoneName).to.equal('test');
        expect(data.isCompleted).to.equal(false);
        client.disconnect();
        done();
      });
    });
  });

  it('should rename the milestone', function(done) {
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

        // Emit event when all clients are connected.
        client.emit('USER_UPDATE_MILESTONE_NAME', milestoneID, milestoneName);
        client.on('UPDATE_MILESTONE_NAME', data => {
            expect(data).to.equal('New Milestone Name');
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
      client.emit('USER_UPDATE_MILESTONE_COMPLETED',milestoneID, 'True');
      client.on('UPDATE_MILESTONE_COMPLETED', data => {
        expect(data).to.equal('True');
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
          client.emit('USER_UPDATE_MILESTONE_COMPLETED',milestoneID, 'False');
          client.on('UPDATE_MILESTONE_COMPLETED', data => {
              expect(data).to.equal('False');
              client.disconnect();
              done();
          });
      });
  });
  });
