// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const DirectMessageModel = require('../model/DirectMessageModel.js');
const UserController = require('./userController.js')
const listOfDiscussion = [];

/**
 * 
 * @param {*} senderID 
 * @param {*} receiverID 
 * @param {*} message 
 * I insert the message into the database
 * then I return the chat history to the frontend
 */
async function insertDirectMessage(senderID, receiverID, message) {
    return new Promise(async resolve => {
        if (message.length > 0) {
            client.query('INSERT INTO DirectMessaging(SenderID, ReceiverID, MessageDate, Message) VALUES(?,?,NOW(),?)', [senderID, receiverID, message], async function (error, results, fields) {
                if (error) throw error;
                const messages = await getDirectMessages(senderID, receiverID);
                resolve(messages);
            });
        }
        else {
            const messages = await getDirectMessages(senderID, receiverID);
            resolve(messages);
        }
    })
}

/**
 * 
 * @param {*} senderID 
 * @param {*} receiverID 
 * I check if there were any messages that have been sent between the two users
 * if there were some messages, I add the senderName and the receiverName attributes to the response of the query
 * If no history of the discussion has been saved in local (listOfDiscussion), I add the discussion to the list
 * Then I return the messages that have been sent
 */
async function getDirectMessages(senderID, receiverID) {
    return new Promise(async (resolve) => {
        let result = [];
        client.query('SELECT senderId, receiverId, Message, MessageID, MessageDate FROM DirectMessaging WHERE SenderID = ? AND ReceiverID = ? OR SenderID = ? and ReceiverID = ? ORDER BY MessageDate', [senderID, receiverID, receiverID, senderID], function (error, results, fields) {
            if (error) throw error;
            if (results.length != 0) {
                results = results.map(elt => {
                    UserController.listOfUsers.forEach(user => {
                        if (elt.senderId === user.getUserId)
                            elt.senderName = user.getUsername;

                        else if (elt.receiverId === user.getUserId)
                            elt.receiverName = user.getUsername;
                    })
                    return elt;
                })
                result = result.concat(results);
                if (!listOfDiscussion.some(discussion => {
                    return ((discussion.getReceiverId == receiverID && discussion.getSenderId == senderID) || (discussion.getReceiverId == senderID && discussion.getSenderId == receiverID))
                })) {
                    const discussion = new DirectMessageModel(senderID, receiverID, results[0].senderName, results[0].receiverName);
                    discussion.setChatHistory = result;
                    listOfDiscussion.push(discussion);
                }
            }
            resolve(result);
        })
    });
}

module.exports = {
    insertDirectMessage: insertDirectMessage,
    getDirectMessages: getDirectMessages
}