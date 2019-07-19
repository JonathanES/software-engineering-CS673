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


  function passwordForgotten(email){
    socket.emit('USER_PASSWORD_FORGOTTEN', email);
  }

  function updatePassword(email, password, cb){
    socket.on("UPDATE_PASSWORD", data => cb(null, data));
    socket.emit("USER_UPDATE_PASSWORD", email, password);
  }

  export {login, register, getFriends, passwordForgotten, updatePassword};

