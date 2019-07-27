// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const TaskModel = require('../model/TaskModel');
//const UserModel = require('../model/UserModel')
//const Priority = require('../model/PriorityModel')


const listOfTasks = [];
const listofTaskUsers = [];

//Function to add a task to a specific category.
//Frontend should call this function when they are in a project and under a category. Similar to Trello
//Function to add a new Project
//Frontend should call this function when they are adding a new project, assumption is that the one who created the project will have admin rights
/**
 * @param {*} parentID of the task, if a task is a subtask of a task this should point to parent Task
 * @param {*} categoryID categoryID of the task that is belong to
 * @param {*} userID of the user who this task is assigned to 
 * @param {*} statusID of the task, task status can be 1 ->'did not start, 2-> working on it, 3 -> done
 * @param {*} priorityID of the task, priority of the task can be 1-> low, 2-> Moderate, 3-> High
 * @param {*} taskName Name of the task, not null
 * @param {*} taskInfo Information about the task, not null
 * @param {*} expectedDuration expected time for the given task
 * @param {*} actualTimeSpent actual time spent on the task
 * 1) user enters the above parameters as input
 * 2) query adds the task under the selected category of the selected project
 * 3) this function can be called from Frontend as follows
 * 
 * client.on('USER_ADD_TASK', async (parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo,  expectedDuration, actualTimeSpent) => {
            const result = await taskController.insertNewTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, expectedDuration, actualTimeSpent);
            client.emit('ADD_TASK', result);
           })

    function addTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, taskInfo, expDuration, actTimeSpent, cb) {
        socket.on('ADD_TASK', data => cb(null, data));
        socket.emit('USER_ADD_TASK', parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, taskInfo, expDuration, actTimeSpent);
    }
 */
async function insertNewTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, dueDate, expectedDuration, actualTimeSpent) {
    return new Promise(async resolve => {
        // console.log('Came here with the category id:', categoryID);
        // console.log('Came here with the userID:', userID);
        // console.log('Came here with the statusID:', statusID);
        // console.log('Came here with the priorityID:', priorityID);
        // console.log('Came here with the taskName:', taskName);
        // console.log('Came here with the taskInfo:', taskInfo);
        // console.log('Came here with the dueDate:', dueDate);
        // console.log('Came here with the expectedDuration:', expectedDuration);
        // console.log('Came here with the actualTimeSpent:', actualTimeSpent);

        client.query('INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, Taskname, Taskinfo, CreatedDate, DueDate, ExpectedDuration, ActualTimeSpent) VALUES(?,?,?,?,?,?,?,NOW(),?,?,?)', [1, categoryID, userID, statusID, priorityID, taskName, taskInfo, dueDate, expectedDuration, actualTimeSpent], async function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            const tasks = await getListofTasks(categoryID);
            resolve(results);
        });
    })
}


//Function to get the information about a single task
/**
 * @param {*} taskID of the task
 * 1) function takes the taskID as input
 * 2) query will return all the information about the task 
 * 3) available information: TaskID, ParentID, CategoryID, UserID, StatusID, PriorityID, Taskname, Taskinfo, CreatedDate, 
 *          ExpectedDuration, ActualTimeSpent and IsDeleted
 * 4) this function should be called from front end as follows 
 * 
 *    client.on('USER_GET_SINGLETASK', async (taskID) => {
            const result = await taskController.getSingleTask(taskID);
            client.emit('GET_SINGLETASK', result);
        })
 */
async function getSingleTask(taskID) {
    return new Promise(resolve => {
        client.query('SELECT * FROM Tasks  WHERE TaskID = ?', [taskID], function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

//Function to get the information about tasks for a given user
/**
 * @param {*} userID of the task
 * 1) function takes the userID as input
 * 2) query will return all the tasks for the user
 * 3) available information: TaskID, ParentID, CategoryID, UserID, StatusName, Priority, TaskName, 
 *          TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent, IsDeleted
 * 4) this function should be called from front end as follows 
 * 
 *    client.on('USER_GET_TASKLIST_USERID', async (userID) => {
            const result = await taskController.getListofTasksForUser(userID);
            client.emit('GET_TASKLIST_USERID', result);
        })
 */
async function getListofTasksForUser(userID){
    return new Promise((resolve, reject) => {
        //console.log(userID);
       client.query('SELECT T.TaskID, T.ParentID, T.CategoryID, T.UserID, TS.StatusID, TS.StatusName, P.PriorityID, P.Priority, T.TaskName, T.TaskInfo, T.CreatedDate, T.DueDate, T.ExpectedDuration, T.ActualTimeSpent, T.IsDeleted FROM Tasks T JOIN TaskStatus TS on TS.StatusID = T.StatusID JOIN Priority P ON T.PriorityID = P.PriorityID WHERE UserID = ? and T.IsDeleted = 0', [userID], function (error, results, fields) {
           results.forEach(result => {
               if (!listofTaskUsers.some(task => task.getTaskID == result.TaskID)){
                   const task = new TaskModel(result.TaskID, result.ParentID, result.CategoryID, result.UserID, result.StatusID, result.StatusName, result.PriorityID, result.Priority, result.TaskName, result.TaskInfo, result.CreatedDate, result.DueDate,result.ExpectedDuration, result.ActualTimeSpent, result.IsDeleted);
                   listofTaskUsers.push(task);
               }
           })
           let userTasks = listofTaskUsers.filter(task => {if (task.getUserID == userID) return task});
           if (error) throw error;
           resolve(userTasks);

        // resolve(results);
       });
    })
}






//Function to get the tasks under a category
/**
 * @param {*} categoryID of the category
 * 1) function takes the categoryID as input
 * 2) query will return all the tasks under that category
 * 3) available information for each task: TaskID, ParentID, CategoryID, UserID, StatusName, Priority, TaskName, 
 *          TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent, IsDeleted
 * 4) this function should be called from front end as follows 
 * 
 *    function getListofTasksForCategories(categoryID, cb){
            socket.on('GET_TASKLIST_CATEGORYID', data => cb(null, data) );
            socket.emit('USER_GET_TASKLIST_CATEGORYID', categoryID);
  }
 */
async function getListofTasksForCategories(categoryID){
    return new Promise((resolve, reject) => {
       client.query('SELECT T.ParentID, T.CategoryID, T.UserID, TS.StatusName, P.Priority, T.TaskName, T.TaskInfo, T.CreatedDate, T.DueDate, T.ExpectedDuration, T.ActualTimeSpent FROM Tasks T JOIN TaskStatus TS on TS.StatusID = T.StatusID JOIN Priority P on P.PriorityID = T.PriorityID WHERE CategoryID = ?', [categoryID], function (error, results, fields) {
           if (error) throw error;
           resolve(results);
       });
    })
}


//This function maybe redundant I will check it later
//******************************************************* */
//******************************************************* */
//******************************************************* */
//******************************************************* */
//this function will return the list of task under the category.
function getListofTasks(categoryID){
    return new Promise((resolve, reject) => {
       client.query('SELECT * FROM Tasks WHERE CategoryID = ?', [categoryID], function (error, results, fields) {
           //console.log(results);
           results.forEach(result => {
               if (!listOfTasks.some(task => task.getTaskID == result.TaskID)){
                   const task = new TaskModel(result.TaskID, result.ParentID, result.CategoryID, result.UserID, result.StatusID, result.PriorityID, result.TaskName, result.TaskInfo, result.CreatedDate, result.DueDate, result.ExpectedDuration, result.ActualTimeSpent, result.IsDeleted);
                   listOfTasks.push(task);
               }
           })
           if (error) throw error;
           resolve(listOfTasks);
       });
    })
}
//******************************************************* */
//******************************************************* */
//******************************************************* */
//******************************************************* */




//Function to update the status of the task
/**
 * @param {*} taskID of the task
 * @param {*} statusID the new status of the task
 * 1) function takes the taskID and StatusID as inputs
 * 2) query will update the task's status
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_TASK_STATUS', async (taskID, statusID) => {
            const result = await taskController.updateStatus(taskID, statusID);
            client.emit('UPDATE_TASK_STATUS', result);
        })
 */
async function updateStatus(taskID, statusID) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  StatusID = ?  WHERE TaskID = ?; ', [statusID,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("Status modify function called");
            resolve(statusID);
        }); 
    })
}


//Function to update the name of the task
/**
 * @param {*} taskID of the task
 * @param {*} taskName the new name of the task
 * 1) function takes the taskID and taskName as inputs
 * 2) query will update the task's name
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_TASK_NAME', async (taskID, taskName) => {
            const result = await taskController.updateTaskName(taskID, taskName);
            client.emit('UPDATE_TASK_NAME', result);
        })
 */
async function updateTaskName(taskID, taskName) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  TaskName = ?  WHERE TaskID = ?; ', [taskName,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateTaskName function called");
            resolve(taskName);
        }); 
    })
}

async function updateDueDate(taskID, dueDate) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  DueDate = ?  WHERE TaskID = ?; ', [dueDate,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updatedueDate function called");
            resolve(dueDate);
        }); 
    })
}


//Function to update the priority of the task
/**
 * @param {*} taskID of the task
 * @param {*} priorityID the new priority of the task
 * 1) function takes the taskID and priorityID as inputs
 * 2) query will update the task's priority
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_TASK_PRIORITY', async (taskID, priorityID) => {
            const result = await taskController.updatePriority(taskID, priorityID);
            client.emit('UPDATE_TASK_PRIORITY', result);
        })
 */
async function updatePriority(taskID, priorityID) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  PriorityID = ?  WHERE TaskID = ?; ', [priorityID,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updatePriority function called");
            resolve(priorityID);
        });  
    })
}

//Function to update the info of the task
/**
 * @param {*} taskID of the task
 * @param {*} taskInfo the new info of the task
 * 1) function takes the taskID and taskInfo as inputs
 * 2) query will update the task's info
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_TASK_INFO', async (taskID, taskInfo) => {
            const result = await taskController.updateTaskInfo(taskID, taskInfo);
            client.emit('UPDATE_TASK_INFO', result);
        })
 */
async function updateTaskInfo(taskID, taskInfo) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET TaskInfo = ?  WHERE TaskID = ?; ', [taskInfo,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("UpdateTaskInfo function called");
            resolve(taskInfo);
        });
    })
}

//Function to update the expected duration of the task
/**
 * @param {*} taskID of the task
 * @param {*} expDuration the new expected duration of the task
 * 1) function takes the taskID and expDuration as inputs
 * 2) query will update the task's expected duration
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_TASK_EXPDURATION', async (taskID, expectedDuration) => {
            const result = await taskController.updateExpectedDuration(taskID, expectedDuration);
            client.emit('UPDATE_TASK_EXPDURATION', result);
        })
 */
async function updateExpectedDuration(taskID, expDuration) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET ExpectedDuration = ?  WHERE TaskID = ?; ', [expDuration,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("UpdateExpectedDuration function called");
            resolve(expDuration);
        });
    })
}


//Function to update the actual time spent on the task
/**
 * @param {*} taskID of the task
 * @param {*} timeSpent the new actual time spent on the task
 * 1) function takes the taskID and timeSpent as inputs
 * 2) query will update the task's actual time spent on
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_TASK_ACTTIME', async (taskID, actualTimeSpent) => {
            const result = await taskController.updateActualTimeSpent(taskID, actualTimeSpent);
            client.emit('UPDATE_TASK_ACTTIME', result);
        })
 */
async function updateActualTimeSpent(taskID, timeSpent) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  ActualTimeSpent = ?  WHERE TaskID = ?; ', [timeSpent,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("UpdateExpectedDuration function called");
            resolve(timeSpent);
        });
    })
}

//Function to mark the task as deleted or active
/**
 * @param {*} taskID of the task
 * @param {*} isDeleted the new flag for the task
 * 1) function takes the taskID and isDeleted as inputs
 * 2) query will update the task's isDeleted value false -> for active task, true -> for marking as deleted
 * 3) this function should be called from front end as follows 
 * 
 *     client.on('USER_UPDATE_TASK_ISDELETE', async (taskID, isdelete) => {
            const result = await taskController.updateIsDeleted(taskID, isdelete);
            client.emit('UPDATE_TASK_ISDELETE', result);
        })
 */
async function updateIsDeleted(taskID, isDeleted) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET IsDeleted = ? WHERE TaskID = ?; ', [isDeleted,taskID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("UpdateIsDeleted function called");
            resolve(isDeleted);
        });
    })
}




module.exports = {
    insertNewTask: insertNewTask,
    getListofTasks: getListofTasks,
    getListofTasksForUser: getListofTasksForUser,
    getSingleTask:getSingleTask,
    updateStatus: updateStatus,
    updatePriority: updatePriority,
    updateTaskName: updateTaskName,
    updateDueDate: updateDueDate,
    updateTaskInfo: updateTaskInfo,
    updateExpectedDuration: updateExpectedDuration,
    updateActualTimeSpent: updateActualTimeSpent,
    updateIsDeleted: updateIsDeleted,
    getListofTasksForCategories:getListofTasksForCategories,
}