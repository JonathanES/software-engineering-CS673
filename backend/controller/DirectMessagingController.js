// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const DirectMessageModel = require('../Model/DirectMessageModel');
const listOfDiscussion = [];


async function insertDirectMessage(senderID, receiverID, message) {
    return new Promise(async resolve => {
        client.query('INSERT INTO DirectMessaging(SenderID, ReceiverID, Date, Message) VALUES(?,?,NOW(),?)', [senderID, receiverID, message], async function (error, results, fields) {
            if (error) throw error;
            //const messages = await getDirectMessages(senderID, receiverID);            
            const discussion = listOfDiscussion.find(elt => (elt.getReceiverId === receiverID && elt.getSenderId === senderID) || (elt.getReceiverId === senderID && elt.getSenderId === receiverID))
            const history = discussion.getChatHistory;
            history.push({receiverID: receiverID, senderID: senderID, receiverName: discussion.getReceiverName, senderName: discussion.getSenderName, Message: message });
            discussion.setChatHistory = history;
            listOfDiscussion.forEach(elt => {
                if ((elt.getReceiverId === receiverID && elt.getSenderId === senderID) || (elt.getReceiverId === senderID && elt.getSenderId === receiverID))
                    elt = discussion;
            })
            resolve(discussion.getChatHistory);
        });
    })
}

async function getDirectMessages(senderID, receiverID) {
    return new Promise(async (resolve) => {
        let result = [];
        client.query('SELECT sender.username as senderName, receiver.username as receiverName, senderId, receiverId, Message, Date FROM DirectMessaging INNER JOIN Users sender ON sender.userID = ? INNER JOIN Users receiver ON receiver.userID = ? WHERE SenderID = ? AND ReceiverID = ? ORDER BY Date DESC', [senderID, receiverID, senderID, receiverID], function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0]);
            if (results.length != 0)
                result = result.concat(results);
            client.query('SELECT sender.username as senderName, receiver.username as receiverName, senderId, receiverId, Message, Date FROM DirectMessaging INNER JOIN Users sender ON sender.userID = ? INNER JOIN Users receiver ON receiver.userID = ? WHERE SenderID = ? AND ReceiverID = ? ORDER BY Date DESC', [receiverID, senderID, receiverID, senderID], function (error, results, fields) {
                if (results.length != 0)
                    result = result.concat(results);
                if (!listOfDiscussion.some(discussion => discussion.getReceiverId == receiverID && discussion.senderID == senderID)) {
                    const discussion = new DirectMessageModel(senderID, receiverID, results[0].senderName, results[0].receiverName);
                    discussion.setChatHistory = result;
                    listOfDiscussion.push(discussion);
                }
                resolve(result);
            })
        });
    });
}

module.exports = {
    insertDirectMessage: insertDirectMessage,
    getDirectMessages: getDirectMessages
}