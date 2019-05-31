import {socket} from './config'

function login(email, password, cb){
    socket.on('LOGIN', data => cb(null, data) );
    socket.emit('USER_LOGIN', email, password);
  }

  function register(username, email, password, cb){
    socket.on('REGISTER', data => cb(null, data) );
    socket.emit('USER_REGISTER',username, email, password);
  }

  function sendMessage(username, message, cb){
    socket.on('SEND_MESSAGE', data => cb(null, data) );
    socket.emit('USER_SEND_MESSAGE', username, message);
  }

  function getMessage(){
    socket.emit('USER_GET_MESSAGE');
  }

  export {login, register, sendMessage, getMessage};