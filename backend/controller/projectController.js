// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');


const listOfProjects = [];

//Function to add a new Project
//Frontend should call this function when they are adding a new project, assumption is that the one who created the project will have admin rights
async function insertNewProject  (userID, projectName, dueDate) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Projects(ProjectName, DateCreated, DueDate) VALUES(?,NOW(),?)', [projectName, dueDate], async function (error, results, fields) {
            if (error) throw error;
            const projects = await getListofProjects(userID);
            resolve(projects);
        });

        // I am assuming 1 = Admin for user accounts
        client.query('INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) VALUES(?,?,?)', [userID, ProjectID, 1], async function (error, results, fields) {
            if (error) throw error;
        });
    })
}

//this function will return the list of Projects for user 
function getListofProjects(userID){
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



module.exports = {
    insertNewProject: insertNewProject,
    getListofProjects: getListofProjects
}
