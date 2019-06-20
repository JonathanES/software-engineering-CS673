/**
 * file that lets us send socket request to the backend and retrieve the information from the backend
 */
import {socket} from './config'
  function sendMessage(username, message, cb){
    socket.on('SEND_MESSAGE', data => cb(null, data) );
    socket.emit('USER_SEND_MESSAGE', username, message);
  }

  function getMessage(){
    socket.emit('USER_GET_MESSAGE');
  }

  export {sendMessage, getMessage};