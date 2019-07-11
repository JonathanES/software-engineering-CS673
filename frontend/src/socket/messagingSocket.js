/**
 * file that lets us send socket request to the backend and retrieve the information from the backend
 */
import {socket} from './config'
  function sendMessage(userId, receiverId, message, cb){
    socket.on('SEND_MESSAGE', data => {console.log("send " + data); cb(null, data)} );
    socket.emit('USER_SEND_MESSAGE', userId, receiverId, message);
  }

  function getMessage(userId, receiverId, cb){
    socket.on('SEND_MESSAGE', data => {console.log("get " + data); cb(null, data)} );
    socket.emit('USER_GET_MESSAGE', userId, receiverId);
  }

  export {sendMessage, getMessage};