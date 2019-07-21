/**
 * file that lets us send socket request to the backend and retrieve the information from the backend
 */

import {socket} from './config'
  function createGroup(groupName, userId,cb){
    socket.on('CREATE_GROUP', data => cb(null, data) );
    socket.emit('USER_CREATE_GROUP', groupName, userId);
  }

  function addUserGroup(userId, groupId, cb){
    socket.on('ADD_USER_GROUP', data => cb(null, data) );
    socket.emit('USER_ADD_USER_GROUP', userId, groupId);
  }

  function removeUserGroup(userId, groupId, cb){
    socket.on('REMOVE_USER_GROUP', data => cb(null, data) );
    socket.emit('USER_REMOVE_USER_GROUP', userId, groupId);
  }
    // get users of a group
    function getGroupUsers(groupId, cb){
    socket.on('GET_GROUP_USERS', data => cb(null, data) );
    socket.emit('USER_GET_GROUP_USERS', groupId);
  }

  // get groups of a user
  function getUserGroups(userId, cb){
    socket.on('GET_USER_GROUPS', data => cb(null, data) );
    socket.emit('USER_GET_USER_GROUPS', userId);
  }

  // send a message to a group
  function sendGroupMessage(userId, groupId,message,cb){
    socket.on('SEND_GROUP_MESSAGE', data => cb(null, data) );
    socket.emit('USER_SEND_GROUP_MESSAGE', userId,groupId,message);
  }

function getGroupMessage(groupID, cb){
  socket.on('SEND_GROUP_MESSAGE', data => cb(null, data) );
  socket.emit('USER_GET_GROUP_MESSAGE', groupID);
}

function getUsersNotInGroup(groupID, cb){
  socket.on('GET_USERS_NOT_IN_GROUP', data => cb(null, data) );
  socket.emit('USER_GET_USERS_NOT_IN_GROUP', groupID);
}

  export {createGroup, addUserGroup,getGroupUsers,getUserGroups,sendGroupMessage, getGroupMessage, getUsersNotInGroup, removeUserGroup};