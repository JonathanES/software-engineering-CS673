// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const TaskModel = require('../model/TaskModel');
//const UserModel = require('../model/UserModel')
//const Priority = require('../model/PriorityModel')


const listOfTasks = [];

//Function to add a task to a specific category.
//Frontend should call this function when they are in a project and under a category. Similar to Trello
async function insertNewTask(parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo, expectedDuration, actualTimeSpent) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, Taskname, Taskinfo, CreatedDate, ExpectedDuration, ActualTimeSpent) VALUES(?,?,?,?,?,?,?,NOW(),?,?)', [parentID, categoryID, userID, statusID, priorityID, taskName, taskInfo,  expectedDuration, actualTimeSpent], async function (error, results, fields) {
            if (error) throw error;
            const tasks = await getListofTasks(categoryID);
            resolve(tasks);
        });
    })
}

//this function will return the list of task under the category.
function getListofTasks(categoryID){
    return new Promise((resolve, reject) => {
       client.query('SELECT * FROM Tasks WHERE CategoryID = ?', [categoryID], function (error, results, fields) {
           //console.log(results);
           results.forEach(result => {
               if (!listOfTasks.some(task => task.getTaskID == result.TaskID)){
                   const task = new TaskModel(result.TaskID, result.ParentID, result.CategoryID, result.UserID, result.StatusID, result.Priority, result.TaskName, result.TaskInfo, result.CreatedDate, result.ExpectedDuration, result.ActualTimeSpent);
                   listOfTasks.push(task);
               }
           })
           if (error) throw error;
           resolve(results);
       });
    })
}


// The following functions are the function related to Task Control
//Frontend should use it to modify a task 
async function updateStatus(taskID, statusID) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  StatusID = ?  WHERE TaskID = ?; ', [statusID,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("Status modify function called");
            resolve(statusID);
        }); 
    })
}

async function updateTaskName(taskID, taskName) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  TaskName = ?  WHERE TaskID = ?; ', [taskName,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("updateTaskName function called");
            resolve(taskName);
        }); 
    })
}

async function updatePriority(taskID, priorityID) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  PriorityID = ?  WHERE TaskID = ?; ', [priorityID,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("updatePriority function called");
            resolve(priorityID);
        });  
    })
}

async function updateTaskInfo(taskID, taskInfo) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET TaskInfo = ?  WHERE TaskID = ?; ', [taskInfo,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("UpdateTaskInfo function called");
            resolve(taskInfo);
        });
    })
}

async function updateExpectedDuration(taskID, expDuration) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET ExpectedDuration = ?  WHERE TaskID = ?; ', [expDuration,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("UpdateExpectedDuration function called");
            resolve(expDuration);
        });
    })
}

async function updateActualTimeSpent(taskID, timeSpent) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  ActualTimeSpent = ?  WHERE TaskID = ?; ', [timeSpent,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("UpdateExpectedDuration function called");
            resolve(timeSpent);
        });
    })
}

async function updateIsDeleted(taskID, isDeleted) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET IsDeleted = ? WHERE TaskID = ?; ', [isDeleted,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("UpdateIsDeleted function called");
            resolve(isDeleted);
        });
    })
}




module.exports = {
    insertNewTask: insertNewTask,
    getListofTasks: getListofTasks,
    updateStatus: updateStatus,
    updatePriority: updatePriority,
    updateTaskName: updateTaskName,
    updateTaskInfo: updateTaskInfo,
    updateExpectedDuration: updateExpectedDuration,
    updateActualTimeSpent: updateActualTimeSpent,
    updateIsDeleted: updateIsDeleted
}