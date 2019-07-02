/**
 * socket section that is about the user
 * it is the link between the frontend and the backend for the user
 */

 //retrieve the functions that has been exported in the userController
 const messagingController = require('../../../controller/DirectMessagingController');
 const groupMessagingController = require('../../../controller/groupMessageController');
 module.exports = function (io) {
     //connect to the socket so that we can link with the frontend
     io.on('connection', client => { 
         client.on('USER_SEND_MESSAGE', async (senderID, receiverID, message) => {
             const result = await messagingController.insertDirectMessage(senderID, receiverID, message)
             console.log(result[result.length - 1].Message);
             client.emit('SEND_MESSAGE', result);
            })
 
         client.on('USER_GET_MESSAGE', async (senderID, receiverID) => {
             const result = await messagingController.getDirectMessages(senderID, receiverID);
             //client.emit('SEND_MESSAGE', result);
             client.emit('SEND_MESSAGE', result);
         })

         client.on('USER_SEND__GROUP_MESSAGE', async (userID, groupID, message) => {
            const result = await groupMessagingController.insertGroupMessage(userID,groupID, message)
            client.broadcast.emit('SEND_GROUP_MESSAGE', result);
           })

        client.on('USER_GET_GROUP_MESSAGE', async (groupID) => {
            const result = await groupMessagingController.getGroupMessages(groupID)
            //client.emit('SEND_MESSAGE', result);
            client.broadcast.emit('SEND_GROUP_MESSAGE', result);
        })
     })
 };