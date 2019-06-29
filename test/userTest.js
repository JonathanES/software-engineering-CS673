var expect = require('chai').expect;
var io = require('socket.io-client');

var server = require('../server.js');

var socketUrl = 'http://localhost:8000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('User test', function () {
  it('should login this user', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_LOGIN', 'jonathan.espiard@gmail.com', 'pwd');
      client.on('LOGIN', data => {
        expect(data.username).to.equal('Jonathan');
        expect(data.email).to.equal('jonathan.espiard@gmail.com');
        client.disconnect();
        done();
      });
    });
  });
});