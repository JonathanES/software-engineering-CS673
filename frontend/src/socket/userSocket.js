/**
 * file that lets us send socket request to the backend and retrieve the information from the backend
 */
import {socket} from './config'

function login(email, password, cb){
    socket.on('LOGIN', data => cb(null, data) );
    socket.emit('USER_LOGIN', email, password);
  }

  function register(username, email, password, cb){
    socket.on('REGISTER', data => cb(null, data) );
    socket.emit('USER_REGISTER',username, email, password);
  }

  function getFriends(userId, cb){
    socket.on('FRIENDS', data => cb(null, data) );
    socket.emit('USER_FRIENDS',userId);
  }

  function getAvailableUsers(projectID, userID, cb){
    socket.on('AVAILABLEUSER', data => cb(null, data));
    socket.emit('GET_AVAILABLEUSER', projectID, userID);
  }

  export {login, register, getFriends, getAvailableUsers};