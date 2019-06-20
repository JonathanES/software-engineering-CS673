/**
 * socket section that is about the user
 * it is the link between the frontend and the backend for the user
 */

 //retrieve the functions that has been exported in the userController
 const messagingController = require('../../../controller/DirectMessagingController');
 module.exports = function (io) {
     //connect to the socket so that we can link with the frontend
     io.on('connection', client => { 
         client.on('USER_SEND_MESSAGE', async (senderID, receiverID, message) => {
             const result = messagingController.insertDirectMessage(senderID, receiverID, message)
             client.broadcast.emit('SEND_MESSAGE', result);
         })
 
         client.on('USER_GET_MESSAGE', async (senderID, receiverID) => {
             const result = messagingController.getDirectMessages(senderID, receiverID);
             client.broadcast.emit('SEND_MESSAGE', result);
         })
     })
 };