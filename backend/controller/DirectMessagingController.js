// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');

async function insertDirectMessage(senderID, receiverID, message) {
    return new Promise(async resolve => {
        client.query('INSERT INTO DirectMessaging(SenderID, ReceiverID, Date, Message) VALUES(?,?,NOW(),?)', [senderID, receiverID, message], async function (error, results, fields) {
            if (error) throw error;
            const messages = await getDirectMessages(senderID, receiverID);            
            resolve(messages);
        });
    })
}

async function getDirectMessages(senderID, receiverID) {
    return new Promise(async (resolve) => {
        client.query('SELECT Message, Date FROM DirectMessaging WHERE SenderID = ? AND ReceiverID = ? ORDER BY Date DESC', [senderID, receiverID], function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0]);
            resolve(results[0]);
        });
    });
}

module.exports = {
    insertDirectMessage: insertDirectMessage,
    getDirectMessages: getDirectMessages
}