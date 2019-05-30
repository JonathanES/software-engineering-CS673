import {socket} from './config'

function login(email, password, cb){
    socket.on('LOGIN', data => cb(null, data) );
    socket.emit('USER_LOGIN', email, password);
  }

  function register(username, email, password, cb){
    socket.on('INSCRIPTION', data => cb(null, data) );
    socket.emit('USER_INSCRIPTION',username, email, password);
  }

  function sendMessage(id_group, username, message, cb){
    socket.on('SEND_MESSAGE', data => cb(null, data) );
    socket.emit('USER_SEND_MESSAGE', id_group, username, message);
  }

  export {login, register, sendMessage};