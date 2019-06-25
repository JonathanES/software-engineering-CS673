
const taskController = require('../../../controller/taskController');
module.exports = function (io) {
    //connect to the socket so that we can link with the frontend
    io.on('connection', client => { 
        client.on('USER_CREATE_TASK', async (parentID, categoryID, userID, taskName, taskinfo, priority, axpectedDuration, actualTimeSpent,statusID ) => {
            const result = await taskController.insertNewTask(parentID, categoryID, userID, taskName, taskinfo, priority, axpectedDuration, actualTimeSpent,statusID)
            client.emit('CREATE_TASK', result);
           })

        client.on('USER_GET_TASKLIST', async (categoryID) => {
            const result = await taskController.getListofTasks(categoryID)
            //client.emit('SEND_MESSAGE', result);
            client.emit('GET_TASKLIST', result);
        })

        client.on('USER_UPDATE_TASK_STATUS', async (taskID, statusID) => {
            const result = await taskController.updateStatus(taskID, statusID)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_TASK_STATUS', result);
        })

        client.on('USER_UPDATE_TASK_NAME', async (taskID, taskName) => {
            const result = await taskController.updateTaskName(taskID, taskName)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_TASK_NAME', result);
        })

        client.on('USER_UPDATE_TASK_PRIORITY', async (taskID, priorityID) => {
            const result = await taskController.updatePriority(taskID, priorityID)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_TASK_PRIORITY', result);
        })

        client.on('USER_UPDATE_TASK_INFO', async (taskID, taskInfo) => {
            const result = await taskController.updateTaskInfo(taskID, taskInfo)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_TASK_INFO', result);
        })

        client.on('USER_UPDATE_TASK_EXPDURATION', async (taskID, expDuration) => {
            const result = await taskController.updateExpectedDuration(taskID, expDuration)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_TASK_EXPDURATION', result);
        })

        client.on('USER_UPDATE_TASK_ACTTIME', async (taskID, actTime) => {
            const result = await taskController.updateActualTimeSpent(taskID, actTime)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_TASK_ACTTIME', result);
        })

    })
};
