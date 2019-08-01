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
             const result = await messagingController.insertDirectMessage(senderID, receiverID, message);
             io.sockets.in(receiverID).emit('SEND_MESSAGE', result);
             io.sockets.in(senderID).emit('SEND_MESSAGE', result);
            })
 
         client.on('USER_GET_MESSAGE', async (senderID, receiverID) => {
             const result = await messagingController.getDirectMessages(senderID, receiverID);
             io.sockets.in(senderID).emit('SEND_MESSAGE', result);
            io.sockets.in(receiverID).emit('SEND_MESSAGE', result);
         })


         //create a group
         client.on('USER_CREATE_GROUP', async(groupName, userId) => {
             const result = await groupMessagingController.createGroup(groupName, userId);
             client.emit('CREATE_GROUP', result);
         })

         //add user to a group
         client.on('USER_ADD_USER_GROUP', async(userId, groupId) => {
             const result = await groupMessagingController.addUserToGroup(userId, groupId);
             client.emit('ADD_USER_GROUP', result);
         })

         //remove user in a group
         client.on('USER_REMOVE_USER_GROUP', async(userId, groupId) => {
            const result = await groupMessagingController.removeUserInGroup(userId, groupId);
            client.emit('REMOVE_USER_GROUP', result);
        })

         // get users of a group
         client.on('USER_GET_GROUP_USERS', async(groupId) => {
            const result = await groupMessagingController.getGroupUsers(groupId);
            client.emit('GET_GROUP_USERS', result);
        })

        // get groups of a user
         client.on('USER_GET_USER_GROUPS', async(userId) => {
             const result = await groupMessagingController.getUserGroups(userId);
             result.forEach(group => {
                client.join(group.GroupID);
             })
             client.emit('GET_USER_GROUPS', result);
         })

         client.on('USER_SEND_GROUP_MESSAGE', async (userID, groupID, message) => {
            const result = await groupMessagingController.insertGroupMessage(userID,groupID, message)
            io.sockets.in(groupID).emit('SEND_GROUP_MESSAGE', result);
           })

        client.on('USER_GET_GROUP_MESSAGE', async (groupID) => {
            const result = await groupMessagingController.getGroupMessages(groupID)
            client.emit('SEND_GROUP_MESSAGE', result);
        })

        // get users that are not in group
        client.on('USER_GET_USERS_NOT_IN_GROUP', async (groupID) => {
            const result = await groupMessagingController.getUsersNotInGroup(groupID);
            client.emit('GET_USERS_NOT_IN_GROUP', result);
        })
     })
 };