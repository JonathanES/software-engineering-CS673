// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
//const DirectMessageModel = require('../Model/DirectMessageModel');
//const UserController = require('./UserController')
//const listOfDiscussion = [];

const listOfTasks = [];

async function insertNewTask(parentID, CategoryID, UserID, Taskname, Taskinfo, Priority, ExpectedDuration, ActualTimeSpent) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Tasks(parentID, CategoryID, UserID, Taskname, Taskinfo, Priority, CreatedDate, ExpectedDuration, ActualTimeSpent,StatusID) VALUES(?,?,?,?,?,?,NOW(),?,?,?)', [parentID, CategoryID, UserID, Taskname, Taskinfo, Priority, ExpectedDuration, ActualTimeSpent, StatusID], async function (error, results, fields) {
            if (error) throw error;
            const tasks = await getListofTasks(CategoryID);
            resolve(tasks);
        });
    })
}


async function editStatus(TaskID, statusID) {
    return new Promise(async resolve => {

        client.query('UPDATE Tasks SET  SatusID = ?  WHERE TaskID = ?; ', [statusID,TaskID], async function (error, results, fields) {
            if (error) throw error;
            console.log("Status modify function called");
            resolve(statusID);
        });
       
        
    })
}




function getListofTasks(CategoryID){
    return new Promise((resolve, reject) => {
       client.query('SELECT * FROM Tasks WHERE CategoryID = ?', [CategoryID], function (error, tasks, fields) {
           tasks.forEach(task => {
               if (!listOfTasks.some(elt => elt.getTaskID == task.TaskID)){
                   const taskModel = new TaskModel(elt.TaskID, elt.TaskName, elt.parentID,elt.CategoryID,elt.UserID,elt.TaskInfo,elt.Priority,elt.CreatedDate,elt.ExpecedDuration,elt.ActualTimeSpent);
                   listOfTasks.push(taskModel);
               }
           })
           if (error) throw error;
           resolve(tasks);
       });
    })
   }

module.exports = {
    insertNewTask: insertNewTask,
    modifyTask: modifyTask,
    getListofTasks: getListofTasks,
    editStatus: editStatus
}
