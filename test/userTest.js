const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../backend/config/database');

let testUserId;

const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('User test', function () {

  it("should insert a new user", function(done) {
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_REGISTER', 'test', 'test@gmail.com','pwd');
      client.on('REGISTER', data => {
        testUserId = data.userId;
        expect(data.username).to.equal('test');
        expect(data.email).to.equal('test@gmail.com');
        client.disconnect();
        done();
      });
    });
  });

  it("should say a the user already exists", function(done) {
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_REGISTER', 'test', 'test@gmail.com','pwd');
      client.on('REGISTER', data => {
        expect(data).to.equal('user exists already');
        db.query('DELETE FROM Users WHERE UserID = ?', [testUserId], (error, results, fields) => {
          if (error) throw error;
          client.disconnect();
          done();
        });
      });
    });
  });

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

  it('should not login this user because wrong email', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_LOGIN', 'jonathan.espiard@gmail', 'pwd');
      client.on('LOGIN', data => {
        expect(data).to.equal('wrong email or wrong password');
        client.disconnect();
        done();
      });
    });
  });

  it('should not login this user because wrong pwd', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_LOGIN', 'jonathan.espiard@gmail.com', 'pwdd');
      client.on('LOGIN', data => {
        expect(data).to.equal('wrong email or wrong password');
        client.disconnect();
        done();
      });
    });
  });

  it('should return an array of users', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {
      client.emit('USER_FRIENDS', 2);
      client.on('FRIENDS', data => {
        expect(data[0].userId).to.equal(3);
        expect(data[0].username).to.equal('toto');
        expect(data[0].email).to.equal('toto@gmail.com')
        expect(data.length).to.be.above(0);
        expect(data.some(elt => elt.userId == 1)).to.equal(false);
        expect(data.some(elt => elt.username == "Jonathan")).to.equal(false);
        client.disconnect();
        done();
      });
    });
  });
});