const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../backend/config/database');

const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('User test', function () {
  it('should send a direct message', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_SEND_MESSAGE', 2, 3, 'test');
      client.on('SEND_MESSAGE', data => {
        console.log(data[data.length - 1].Message);
        expect(data[data.length - 1].senderId).to.equal(2);
        expect(data[data.length - 1].receiverId).to.equal(3);
        expect(data[data.length - 1].Message).to.equal('test');
        db.query('DELETE FROM DirectMessaging WHERE Message = ? AND senderID = ? AND receiverID = ?', ['test',2,3], (error) => {
            if (error) throw error;
            client.disconnect();
            done();
        })
      });
    });
  });
});