// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const ProjectModel = require('../model/ProjectModel');

const listOfProjects = [];
let pID = -1;

//Function to add a new Project
//Frontend should call this function when they are adding a new project, assumption is that the one who created the project will have admin rights
async function insertNewProject(userID, projectName, dueDate) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Projects(ProjectName, DateCreated, DueDate) VALUES(?,NOW(),?)', [projectName, dueDate], async function (error, results, fields) {
            if (error) throw error;
            const projects = await getListOfProjects(userID);
            resolve(projects);
        });

        let pID = await findProjectID(projectName);

        //console.log('pID: ',pID);
        client.query('INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) VALUES(?,?,?)', [userID, pID, 1], async function (error, results, fields) {
            if (error) throw error;
        });
    })
}

async function findProjectID(projectName) {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM Projects WHERE ProjectName = ?', [projectName], function (error, results, fields) {
            const pID = results[results.length - 1].ProjectID;
            if (error) throw error;
            resolve(pID);
        });
    })
}


//this function will return the list of Projects for user
function getListOfProjects(userID) {
    return new Promise((resolve, reject) => {
        console.log('Project for user:', userID)
        client.query('SELECT * FROM Projects P Join ProjectUsers PU on P.ProjectID = PU.ProjectID WHERE PU.UserID = ?', [userID], function (error, results, fields) {
            //console.log(results);
            results.forEach(result => {
                if (!listOfProjects.some(project => project.getProjectID == result.ProjectID)) {
                    const project = new ProjectModel(result.ProjectID, result.ProjectName, result.DateCreated, result.DueDate);
                    listOfProjects.push(project);
                }
            })
            if (error) throw error;
            resolve(listOfProjects);

        });
    })
}



async function updateProjectName(projectID, projectName) {
    return new Promise(async resolve => {

        client.query('UPDATE Projects SET ProjectName = ?  WHERE ProjectID = ?; ', [projectName, projectID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateProjectName function called");
            resolve(projectName);
        });
    })
}

async function updateProjectDueDate(projectID, dueDate) {
    return new Promise(async resolve => {

        client.query('UPDATE Projects SET DueDate = ?  WHERE ProjectID = ?; ', [dueDate, projectID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateProjectDueDate function called");
            resolve(dueDate);
        });
    })
}


async function updateProjectIsDeleted(projectID, isDeleted) {
    return new Promise(async resolve => {

        client.query('UPDATE Projects SET IsDeleted = ?  WHERE ProjectID = ?; ', [isDeleted, projectID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateProjectIsDeleted function called");
            resolve(isDeleted);
        });
    })
}


module.exports = {
    insertNewProject: insertNewProject,
    findProjectID: findProjectID,
    getListofProjects: getListOfProjects,
    updateProjectName: updateProjectName,
    updateProjectDueDate: updateProjectDueDate,
    updateProjectIsDeleted: updateProjectIsDeleted
}
