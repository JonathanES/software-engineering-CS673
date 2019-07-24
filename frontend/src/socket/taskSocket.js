import { socket } from './config'

function addTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, dueDate, expDuration, actTimeSpent, cb) {
  socket.on('ADD_TASK', data => cb(null, data));
  socket.emit('USER_ADD_TASK', parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, dueDate, expDuration, actTimeSpent);
}

function getTasksUsers(userID, cb) {
  socket.on('GET_TASKLIST_USERID', data => cb(null, data));
  socket.emit('USER_GET_TASKLIST_USERID', userID);
}

function getListofTasksForCategories(categoryID, cb) {
  socket.on('GET_TASKLIST_CATEGORYID', data => cb(null, data));
  socket.emit('USER_GET_TASKLIST_CATEGORYID', categoryID);
}

function getUserPrev(projectID, userID, cb){
  socket.on('GET_USERPREV', data => cb(null,data));
  socket.emit('USER_GET_USERPREV', projectID, userID);
}

function updateTaskName(taskID, taskName,cb){
  socket.on('UPDATE_TASK_NAME', data => cb(null,data));
  socket.emit('USER_UPDATE_TASK_NAME', taskID, taskName);
}

function updateDueDate(taskID, dueDate,cb){
  socket.on('UPDATE_DUE_DATE', data => cb(null,data));
  socket.emit('USER_UPDATE_DUE_DATE', taskID, dueDate);
}

function updatePriorityID(taskID, priorityID,cb){
  socket.on('UPDATE_TASK_PRIORITY', data => cb(null,data));
  socket.emit('USER_UPDATE_TASK_PRIORITY', taskID, priorityID);
}



export { addTask, getTasksUsers, getListofTasksForCategories, getUserPrev, updateTaskName,updateDueDate, updatePriorityID };