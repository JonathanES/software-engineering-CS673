import { socket } from './config'

function addTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, expDuration, actTimeSpent, cb) {
  socket.on('ADD_TASK', data => cb(null, data));
  socket.emit('USER_ADD_TASK', parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, expDuration, actTimeSpent);
}

function getTasksUsers(userID, cb) {
  socket.on('GET_TASKLIST_USERID', data => cb(null, data));
  socket.emit('USER_GET_TASKLIST_USERID', userID);
}

function getListofTasksForCategories(categoryID, cb) {
  socket.on('GET_TASKLIST_CATEGORYID', data => cb(null, data));
  socket.emit('USER_GET_TASKLIST_CATEGORYID', categoryID);
}

function getuserprev(projectID, userID, cb){
  socket.on('GET_USERPREV', data => cb(null,data));
  socket.emit('USER_GET_USERPREV', projectID, userID);
}


export { addTask, getTasksUsers, getListofTasksForCategories, getuserprev };