import {socket} from './config'

function addTask(userId, taskName, cb){
    socket.on('ADD_TASK', data => cb(null, data) );
    socket.emit('USER_ADD_TASK', userId);
  }

  function getTasksUsers(userID, cb){
    socket.on('GET_TASKLIST_USERID', data => cb(null, data) );
    socket.emit('USER_GET_TASKLIST_USERID', userID);
  }


  export {addTask, getTasksUsers};