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

  export {login, register};