// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
//const DirectMessageModel = require('../Model/DirectMessageModel');
//const UserController = require('./UserController')
//const listOfDiscussion = [];

const listOfProjects = [];

//Function to add a new Project
//Frontend should call this function when they are adding a new project, assumption is that the one who created the project will have admin rights
async function insertNewProject  (userID, projectName, dueDate) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Projects(ProjectName, DateCreated, DueDate) VALUES(?,NOW(),?)', [projectName, dueDate], async function (error, results, fields) {
            if (error) throw error;
            const tasks = await getListOfProjects(userID); // TODO: Why is this labelled as tasks?
            resolve(tasks);
        });

        // I am assuming 1 = Admin for user accounts
        client.query('INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) VALUES(?,?,?)', [userID, ProjectID, 1], async function (error, results, fields) {
            if (error) throw error;
        });
    })
}

//this function will return the list of Projects for user
function getListOfProjects(userID){
    return new Promise((resolve, reject) => {
       client.query('SELECT * FROM Projects P Join ProjectUsers PU on P.ProjectID = PU.ProjectID WHERE PU.UserID = ?', [userID], function (error, projects, fields) {
        projects.forEach(project => {
               if (!listOfProjects.some(elt => elt.getProjectID == project.ProjectID)){
                   const ProjectModel = new ProjectModel(elt.ProjectID, elt.ProjectName, elt.DateCreated,elt.DueDate);
                   listOfProjects.push(ProjectModel);
               }
           })
           if (error) throw error;
           resolve(projects);
       });
    })
   }


// The following functions are the function related to Task Control
//Frontend should use it to modify a task
// async function updateStatus(taskID, statusID) {
//     return new Promise(async resolve => {

//         client.query('UPDATE Tasks SET  SatusID = ?  WHERE TaskID = ?; ', [statusID,taskID], async function (error, results, fields) {
//             if (error) throw error;
//             console.log("Status modify function called");
//             resolve(statusID);
//         });


//     })
//}


module.exports = {
    insertNewProject: insertNewProject,
    getListofProjects: getListofProjects
}
