import { socket } from './config'

function createMilestone(projectID, milestoneName, dueDate, cb) {
  socket.once('CREATE_MILESTONE', data => cb(null, data));
  socket.emit('USER_CREATE_MILESTONE', projectID, milestoneName, dueDate);
}

function getListOfMilestones(projectID, cb) {
  socket.once('GET_MILESTONELIST', data => cb(null, data));
  socket.emit('USER_GET_MILESTONELIST', projectID);
}

function getMilestone(mileStoneID, cb) {
  socket.once('GET_MILESTONE', data => cb(null, data));
  socket.emit('USER_GET_MILESTONE', mileStoneID);
}
function updateMilestoneName(milestoneID, milestoneName, cb){
  socket.once('UPDATE_MILESTONE_NAME', data => cb(null,data));
  socket.emit('USER_UPDATE_MILESTONE_NAME', milestoneID, milestoneName);
}

function updateMilestoneDate(milestoneID, dueDate, cb){
  socket.once('UPDATE_MILESTONE_DATE', data => cb(null,data));
  socket.emit('USER_MILESTONE_DATE', milestoneID, dueDate);
}

function updateMilestoneCompleted(milestoneID, isCompleted, cb){
  socket.once('UPDATE_MILESTONE_DATE', data => cb(null,data));
  socket.emit('USER_UPDATE_MILESTONE_COMPLETED', milestoneID, isCompleted);
}

export { createMilestone, getListOfMilestones, getMilestone, updateMilestoneName,
    updateMilestoneDate,updateMilestoneCompleted};
