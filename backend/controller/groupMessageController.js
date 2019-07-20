// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const GroupModel = require('../model/GroupModel.js');
const GroupMessageModel = require('../model/GroupMessageModel.js');
const UserController = require('./userController.js')
const listOfGroups = [];


function createGroup(groupName, userId) {
    return new Promise(async (resolve, reject) => {
        client.query('INSERT INTO MessageGroups(GroupName) VALUES(?)', [groupName], async (error, results) => {
            if (error) throw error;
            let groupId = results.insertId;
            await addUserToGroup(userId, groupId);
            const group = new GroupModel(groupId, groupName);
            const user = UserController.listOfUsers.find(user => user.getUserId == userId);
            const listOfUsers = [user];
            group.setListOfUsers = listOfUsers;
            listOfGroups.push(group);
            let res = await getUserGroups(userId);
            resolve(res);
        });
    })
}

function addUserToGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
        client.query('INSERT INTO GroupUsers(UserID, GroupID) VALUES(?,?)', [userId, groupId], async (error, results) => {
            if (error) throw error;
            const userList = await getGroupUsers(groupId);
            resolve(userList);
        })
    })
}

function getGroupUsers(groupId){
    return new Promise((resolve, reject) => {
        client.query('SELECT username, Users.userId FROM GroupUsers INNER JOIN Users ON Users.UserID = GroupUsers.UserID WHERE GroupId = ?', [groupId], async function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        }); 
    })
}
/**
 * 
 * @param {*} senderID 
 * @param {*} receiverID 
 * @param {*} message 
 * I insert the message into the database
 * then I return the chat history to the frontend
 */
async function insertGroupMessage(userID, groupID, message) {
    return new Promise(async resolve => {
        client.query('INSERT INTO GroupMessaging(UserID, GroupID, MessageDate, Message) VALUES(?,?,NOW(),?)', [userID, groupID, message], async function (error, results, fields) {
            if (error) throw error;
            const messages = await getGroupMessages(groupID);
            resolve(messages);
        });
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
async function getGroupMessages(groupID) {
    return new Promise(async (resolve) => {
        let result = [];
        client.query('SELECT groupID, userID, Message, MessageDate FROM GroupMessaging WHERE GroupID = ? ORDER BY MessageDate', [groupID], function (error, results, fields) {
            if (error) throw error;
            if (results.length != 0) {
                results = results.map(elt => {
                    UserController.listOfUsers.forEach(user => {
                        if (elt.userID === user.getUserId)
                            elt.senderName = user.getUsername;
                    })
                    return elt;
                })
                result = result.concat(results);
                const group = listOfGroups.find(group => group.getGroupId == groupID);
                const groupMessages = [];
                result.forEach(elt => {
                    const message = new GroupMessageModel(elt.userID, elt.groupID, elt.Message, elt.MessageDate);
                    groupMessages.push(message);
                })
                group.setListOfGroupMessage = groupMessages;
            }
            resolve(result);
        })
    });
}

function getUserGroups(userID) {
    return new Promise((resolve, reject) => {
        client.query('SELECT GroupName, GroupUsers.GroupID FROM GroupUsers INNER JOIN MessageGroups ON MessageGroups.GroupID = GroupUsers.GroupID WHERE UserID = ?', [userID], async function (error, results, fields) {
            if (error) throw error;
            results.forEach(async (group) => {
                const tmp = new GroupModel(group.GroupID, group.GroupName);
                const listOfUsers = await getGroupUsers(group.GroupID);
                tmp.setListOfUsers = listOfUsers;
                listOfGroups.push(tmp);
            });
            resolve(results);
        }); 
    })
}

function getUsersNotInGroup(groupId){
    return new Promise((resolve, reject) => {
        client.query('SELECT UserID, username FROM Users WHERE UserID NOT IN (SELECT UserID FROM GroupUsers WHERE GroupUsers.GroupID = ?)', [groupId], async function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        }); 
    })
}

module.exports = {
    insertGroupMessage: insertGroupMessage,
    getGroupMessages: getGroupMessages,
    createGroup: createGroup,
    getGroupUsers: getGroupUsers,
    addUserToGroup: addUserToGroup,
    getGroupUsers: getGroupUsers,
    getUserGroups: getUserGroups,
    getUsersNotInGroup: getUsersNotInGroup
}