import { socket } from './config'

function createMilestone(projectID, milestoneName, dueDate, cb) {
  socket.on('CREATE_MILESTONE', data => cb(null, data));
  socket.emit('USER_CREATE_MILESTONE', projectID, milestoneName, dueDate);
}

function getListOfMilestones(projectID, cb) {
  socket.on('GET_MILESTONELIST', data => cb(null, data));
  socket.emit('USER_GET_MILESTONELIST', projectID);
}

function getMilestone(mileStoneID, cb) {
  socket.on('GET_MILESTONE', data => cb(null, data));
  socket.emit('USER_GET_MILESTONE', mileStoneID);
}
function updateMilestoneName(milestoneID, milestoneName,cb){
  socket.on('UPDATE_MILESTONE_NAME', data => cb(null,data));
  socket.emit('USER_UPDATE_MILESTONE_NAME', milestoneID, milestoneName);
}

function updateMilestoneDate(milestoneID, dueDate,cb){
  socket.on('UPDATE_MILESTONE_DATE', data => cb(null,data));
  socket.emit('USER_MILESTONE_DATE', milestoneID, dueDate);
}

function updateMilestoneCompleted(milestoneID, isCompleted,cb){
  socket.on('UPDATE_MILESTONE_COMPLETED', data => cb(null,data));
  socket.emit('USER_UPDATE_MILESTONE_COMPLETED', milestoneID, isCompleted);
}

export { createMilestone, getListOfMilestones, getMilestone, updateMilestoneName,
    updateMilestoneDate,updateMilestoneCompleted};
