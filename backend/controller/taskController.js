// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
//const DirectMessageModel = require('../Model/DirectMessageModel');
//const UserController = require('./UserController')
//const listOfDiscussion = [];

const listOfTasks = [];

//Function to add a task to a specific category.
//Frontend should call this function when they are in a project and under a category. Similar to Trello
async function insertNewTask(parentID, categoryID, userID, taskName, taskinfo, priority, axpectedDuration, actualTimeSpent,statusID) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Tasks(parentID, CategoryID, UserID, Taskname, Taskinfo, Priority, CreatedDate, ExpectedDuration, ActualTimeSpent,StatusID) VALUES(?,?,?,?,?,?,NOW(),?,?,?)', [parentID, categoryID, userID, taskName, taskinfo, priority, axpectedDuration, actualTimeSpent,statusID], async function (error, results, fields) {
            if (error) throw error;
            const tasks = await getListofTasks(categoryID);
            resolve(tasks);
        });
    })
}

//this function will return the list of task under the category.
function getListofTasks(categoryID){
    return new Promise((resolve, reject) => {
       client.query('SELECT * FROM Tasks WHERE CategoryID = ?', [categoryID], function (error, tasks, fields) {
           tasks.forEach(task => {
               if (!listOfTasks.some(elt => elt.getTaskID == task.TaskID)){
                   const taskModel = new TaskModel(elt.TaskID, elt.TaskName, elt.parentID,elt.CategoryID,elt.UserID,elt.TaskInfo,elt.Priority,elt.CreatedDate,elt.ExpecedDuration,elt.ActualTimeSpent,elt.StatusID);
                   listOfTasks.push(taskModel);
               }
           })
           if (error) throw error;
           resolve(tasks);
       });
    })
   }


// The following functions are the function related to Task Control
//Frontend should use it to modify a task 
async function updateStatus(taskID, statusID) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  SatusID = ?  WHERE TaskID = ?; ', [statusID,taskID], async function (error, results, fields) {
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

        client.query('UPDATE Tasks SET  TaskInfo = ?  WHERE TaskID = ?; ', [taskInfo,taskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("UpdateTaskInfo function called");
            resolve(taskInfo);
        });
       
        
    })
}

async function updateExpectedDuration(taskID, expDuration) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  ExpectedDuration = ?  WHERE TaskID = ?; ', [expDuration,taskID], async function (error, results, fields) {
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


module.exports = {
    insertNewTask: insertNewTask,
    getListofTasks: getListofTasks,
    updateStatus: updateStatus,
    updatePriority: updatePriority,
    updateTaskName: updateTaskName,
    updateTaskInfo: updateTaskInfo,
    updateExpectedDuration: updateExpectedDuration,
    updateActualTimeSpent: updateActualTimeSpent
}
