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
  function getGroupUser(groupId, cb){
    socket.on('GET_GROUP_USERS', data => cb(null, data) );
    socket.emit('USER_GET_GROUP_USERS', groupId);
  }

  function getUserGroup(userId, cb){
    socket.on('GET_USERS_GROUP', data => cb(null, data) );
    socket.emit('USER_GET_USER_GROUP', userId);
  }

  function sendGroupMessage(userId, groupId,message,cb){
    socket.on('SEND_GROUP_MESSAGE', data => cb(null, data) );
    socket.emit('USER_SEND_GROUP_MESSAGE', userId,groupId,message);
  }

  export {createGroup, addUserGroup,getGroupUser,getUserGroup,sendGroupMessage};