const expect = require('chai').expect;
const io = require('socket.io-client');
const server = require('../../server.js');
const socketUrl = 'http://localhost:8000';
const db = require('../../backend/config/database');
let groupId = 25;
const userId = 11;
const receiverId = 12;
const groupName = "test";

const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Messaging test', function () {
  it('should send a direct message', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', async function () {

      client.emit('USER_LOGIN', 'toto@gmail.com', 'pwd');
      client.on('LOGIN', data => {
        expect(data.username).to.equal('toto');
        expect(data.email).to.equal('toto@gmail.com');
        client.emit('USER_SEND_MESSAGE', userId, receiverId, 'test');
        client.on('SEND_MESSAGE', async (data) => {
          expect(data[data.length - 1].senderId).to.equal(userId);
          expect(data[data.length - 1].receiverId).to.equal(receiverId);
          expect(data[data.length - 1].Message).to.equal('test');
          client.disconnect();
          done();
        });
      });
    });
  });

  it('should get a list of direct message', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      client.emit('USER_LOGIN', 'toto@gmail.com', 'pwd');
      client.on('LOGIN', data => {
        expect(data.username).to.equal('toto');
        expect(data.email).to.equal('toto@gmail.com');
        client.emit('USER_GET_MESSAGE', userId, receiverId);
        client.on('SEND_MESSAGE', data => {
          expect(data.length).to.be.above(0);
          expect(data[data.length - 1].senderId).to.equal(userId);
          expect(data[data.length - 1].receiverId).to.equal(receiverId);
          db.query('DELETE FROM DirectMessaging WHERE Message = ? AND senderID = ? AND receiverID = ?', ['test', userId, receiverId], (error) => {
            if (error) throw error;
            client.disconnect();
            done();
          });
        });
      });
    });
  });

  it('should create a group', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.

      client.emit('USER_CREATE_GROUP', groupName, userId);
      client.on('CREATE_GROUP', data => {
        expect(data[data.length - 1].GroupName).to.be.equal(groupName);
        groupId = data[data.length - 1].GroupID;
        client.disconnect();
        done();
      });
    });
  });

  it('should add a user', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_ADD_USER_GROUP', receiverId, groupId);
      client.on('ADD_USER_GROUP', data => {
        expect(data.inGroup.length).to.be.above(0);
        expect(data.notInGroup.length).to.be.above(0);
        expect(data.inGroup[0].userId).to.be.equal(userId);
        expect(data.inGroup[0].username).to.be.equal("Jonathan");
        expect(data.inGroup[1].userId).to.be.equal(receiverId);
        expect(data.inGroup[1].username).to.be.equal("toto");
        client.disconnect();
        done();
      });
    });
  });

  it('should get users of a group', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.

      client.emit('USER_GET_GROUP_USERS', groupId);
      client.on('GET_GROUP_USERS', data => {
        expect(data.length).to.be.above(0);
        expect(data[0].userId).to.be.equal(userId);
        expect(data[0].username).to.be.equal("Jonathan");
        expect(data[1].userId).to.be.equal(receiverId);
        expect(data[1].username).to.be.equal("toto");
        client.disconnect();
        done();
      });
    });
  });

  it('should get groups of a user', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.

      client.emit('USER_GET_USER_GROUPS', userId);
      client.on('GET_USER_GROUPS', data => {
        expect(data[data.length - 1].GroupID).to.be.equal(groupId);
        expect(data[data.length - 1].GroupName).to.be.equal(groupName);
        client.disconnect();
        done();
      });
    });
  });

  it('should send a message on a group', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      client.emit('USER_GET_USER_GROUPS', userId);
      client.on('GET_USER_GROUPS', data => {
        expect(data[0].GroupID).to.be.equal(groupId);
        expect(data[0].GroupName).to.be.equal(groupName);
        client.emit('USER_SEND_GROUP_MESSAGE', userId, groupId, "hi");
        client.on('SEND_GROUP_MESSAGE', data => {
          expect(data.length).to.be.above(0);
          expect(data[0].groupID).to.be.equal(groupId);
          expect(data[0].userID).to.be.equal(userId);
          expect(data[0].Message).to.be.equal("hi");
          expect(data[0].senderName).to.be.equal("Jonathan");
          client.disconnect();
          done();
        });
      });
      // Emit event when all clients are connected.


    });
  });

  it('should get users that are not in a group', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      client.emit('USER_GET_USERS_NOT_IN_GROUP', groupId);
      client.on('GET_USERS_NOT_IN_GROUP', data => {
        expect(data.inGroup.length).to.be.above(0);
        expect(data.notInGroup.length).to.be.above(0);
        client.disconnect();
        done();
      });
    });
  });

  it('should add a user', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.
      client.emit('USER_REMOVE_USER_GROUP', receiverId, groupId);
      client.on('REMOVE_USER_GROUP', data => {
        expect(data.inGroup.length).to.be.equal(1);
        expect(data.notInGroup.length).to.be.above(0);
        expect(data.inGroup[0].userId).to.be.equal(userId);
        expect(data.inGroup[0].username).to.be.equal("Jonathan");
        client.disconnect();
        done();
      });
    });
  });


  it('should receive a list of message from a group', function (done) {
    // Set up client1 connection
    let client = io.connect(socketUrl, options);

    client.on('connect', function () {

      // Emit event when all clients are connected.

      client.emit('USER_GET_USER_GROUPS', userId);
      client.on('GET_USER_GROUPS', data => {
        expect(data[0].GroupID).to.be.equal(groupId);
        expect(data[0].GroupName).to.be.equal(groupName);
        client.emit('USER_SEND_GROUP_MESSAGE', userId, groupId, "hi");
        client.on('SEND_GROUP_MESSAGE', data => {
          expect(data.length).to.be.above(0);
          expect(data[0].groupID).to.be.equal(groupId);
          expect(data[0].userID).to.be.equal(userId);
          expect(data[0].Message).to.be.equal("hi");
          expect(data[0].senderName).to.be.equal("Jonathan");
          db.query('DELETE FROM GroupUsers where GroupID = ?', [groupId], (error) => {
            if (error) throw error;
            db.query('DELETE FROM GroupMessaging where GroupID = ?', [groupId], (error) => {
              if (error) throw error;
              db.query('DELETE FROM MessageGroups where GroupID = ?', [groupId], (error) => {
                if (error) throw error;
                client.disconnect();
                done();
              });
            });
          });
        });
      });
    });
  });
});