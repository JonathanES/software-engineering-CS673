
const taskController = require('../../../controller/taskController');
module.exports = function (io) {
    //connect to the socket so that we can link with the frontend
    io.on('connection', client => { 
        client.on('USER_CREATE_TASK', async (parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo,  expectedDuration, actualTimeSpent) => {
            const result = await taskController.insertNewTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, expectedDuration, actualTimeSpent);
            client.emit('CREATE_TASK', result);
           })
        
        
        client.on('USER_GET_TASKLIST_USERID', async (userID) => {
            const result = await taskController.getListofTasksForUser(userID);
            client.emit('GET_TASKLIST_USERID', result);
        })

        client.on('USER_GET_TASKLIST', async (categoryID) => {
            const result = await taskController.getListofTasks(categoryID);
            client.emit('GET_TASKLIST', result);
        })

        client.on('USER_UPDATE_TASK_STATUS', async (taskID, statusID) => {
            const result = await taskController.updateStatus(taskID, statusID);
            client.emit('UPDATE_TASK_STATUS', result);
        })

        client.on('USER_UPDATE_TASK_PRIORITY', async (taskID, priorityID) => {
            const result = await taskController.updatePriority(taskID, priorityID);
            client.emit('UPDATE_TASK_PRIORITY', result);
        })

        client.on('USER_UPDATE_TASK_NAME', async (taskID, taskName) => {
            const result = await taskController.updateTaskName(taskID, taskName);
            client.emit('UPDATE_TASK_NAME', result);
        })

        client.on('USER_UPDATE_TASK_INFO', async (taskID, taskInfo) => {
            const result = await taskController.updateTaskInfo(taskID, taskInfo);
            client.emit('UPDATE_TASK_INFO', result);
        })

        client.on('USER_UPDATE_TASK_EXPDURATION', async (taskID, expectedDuration) => {
            const result = await taskController.updateExpectedDuration(taskID, expectedDuration);
            client.emit('UPDATE_TASK_EXPDURATION', result);
        })

        client.on('USER_UPDATE_TASK_ACTTIME', async (taskID, actualTimeSpent) => {
            const result = await taskController.updateActualTimeSpent(taskID, actualTimeSpent);
            client.emit('UPDATE_TASK_ACTTIME', result);
        })

        client.on('USER_UPDATE_TASK_ISDELETE', async (taskID, isdelete) => {
            const result = await taskController.updateIsDeleted(taskID, isdelete);
            client.emit('UPDATE_TASK_ISDELETE', result);
        })

    })
};
