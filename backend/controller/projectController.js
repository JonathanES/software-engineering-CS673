// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
const ProjectModel = require('../model/ProjectModel');
const taskController = require('./taskController');


const listOfProjects = [];
const listOfCategories = [];
let pID = -1;

//Function to add a new Project
//Frontend should call this function when they are adding a new project, assumption is that the one who created the project will have admin rights
/**
 * @param {*} userID of the user that wants to connect to the application
 * @param {*} projectName name of the project to be added
 * @param {*} dueDate   of the project we are adding
 * 1) user enters the name and dueDate for the project
 * 2) query assigns the time of the submission as the DateCreated for the project
 * 3) as default the project's IsDeleted mark as false
 * 4) after the first query which adds the project to Projects table second query add the user who created the project as admin in ProjectUsers table
 * 5) function returns the result of the first query as an output
 * 6) this function can be called from Frontend as follows
 * 
 * client.on('USER_CREATE_PROJECT', async (userID, projectName, dueDate ) => {
            const result = await projectController.insertNewProject(userID,projectName,dueDate);
            client.emit('CREATE_PROJECT', result);
           })
 */
 
async function insertNewProject(userID, projectName, dueDate) {
    return new Promise(async resolve => {
        client.query('INSERT INTO Projects(ProjectName, DateCreated, DueDate) VALUES(?,NOW(),?)', [projectName, dueDate], async function (error, results, fields) {
            if (error) throw error;
            let pID = await findProjectID(projectName);

            //console.log('pID: ',pID);
            client.query('INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) VALUES(?,?,?)', [userID, pID, 1], async function (error, results, fields) {
                if (error) throw error;
                const projects = await getListOfProjects(userID);
                resolve(projects);
            });

        });


    })
}


//Function to findProjectID
//Frontend may or may not need this function
/**
 * @param {*} projectName of the project whose ID is to be returned
 * 1) function takes the projectName as an input
 * 2) query returns the projectID (numeric field)
 * 3) this function can be called from Frontend as follows
 * 
 * client.on('USER_GET_PROJECTID', async (projectName) => {
            const result = await projectController.findProjectID(projectName);
            client.emit('GET_PROJECTID', result);
        })
 */
async function findProjectID(projectName) {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM Projects WHERE ProjectName = ?', [projectName], function (error, results, fields) {
            if (error) throw error;
            const pID = results[results.length - 1].ProjectID;
            resolve(pID);
        });
    })
}


//Function to findProjectID
//this function will return the list of Projects for user
/**
 * @param {*} userID of the user
 * 1) function takes the userID as an input
 * 2) query returns the list of the Projects that the user is working on
 * 3) we have the implementation of this in the Project tab as of 07/09/2019
 * 4) this function can be called from Frontend as follows
 * 
 * client.on('USER_GET_PROJECTLIST', async (userID) => {
            const result = await projectController.getListofProjects(userID);
            client.emit('GET_PROJECTLIST', result);
        })
 */
function getListOfProjects(userID) {
    return new Promise((resolve, reject) => {
        //console.log('Project for user:', userID)
        client.query('SELECT * FROM Projects P Join ProjectUsers PU on P.ProjectID = PU.ProjectID WHERE PU.UserID = ? and P.IsDeleted=?', [userID,0], function (error, results, fields) {
            if (error) throw error;
            results.forEach(result => {
                if (!listOfProjects.some(project => project.getUserID == userID && project.getProjectID == result.ProjectID)) {
                    const project = new ProjectModel(result.ProjectID, result.ProjectName, result.UserID, result.DateCreated, result.DueDate, result.IsDeleted);
                    listOfProjects.push(project);
                }
            })

            let userProjects = listOfProjects.filter(project => {
                if (project.getUserID == userID && project.getIsDeleted == 0) return project
            });
            //console.log(listOfProjects);
            resolve(userProjects);
        });
    })
}


//Function to get categories of a project
//this function will return the list of categories of a Project
/**
 * @param {*} pID as projectID of the project
 * 1) function takes the projectID as an input
 * 2) query returns the list of the Projects that the user is working on
 * 3) we have the implementation of this in the Project tab as of 07/09/2019
 * 4) this function can be called from Frontend as follows
*   
*   client.on('USER_GET_PROJECTCATEGORIES', async (pID) => {
            const result = await projectController.getCategories(pID);
            client.emit('GET_PROJECTCATEGORIES', result);
        })
 */
function getCategories(pID) {
    return new Promise((resolve, reject) => {
        //console.log('Categories for Project:', pID)
        client.query('SELECT * FROM Categories INNER JOIN Projects ON Projects.ProjectID = Categories.ProjectID  WHERE Categories.ProjectID = ?', [pID], async function (error, results, fields) {
            if (error) throw error;
            //console.log(results.length);
            for (category of results) {
                const elt = await taskController.getListofTasksForCategories(category.CategoryID);
                category["listOfTasks"] = elt;

            }
            //if (error) throw error;
            //console.log('results of getCategories:', results);
            //console.log('category array:', category);
            //resolve(results);
            resolve(results);

        });
    })
}

function addCategory(pID,categoryName) {
    return new Promise((resolve, reject) => {
    client.query('INSERT INTO Categories(ProjectID, CategoryName) Values(?,?)', [pID, categoryName], async function (error, results, fields) {
        if (error) throw error;
            //console.log(results);
            if (error) throw error;
            const res = await getCategories(pID);
            resolve(res);

        });
    })
}


//Function to updateProjectName
//this function will update the projectname
/**
 * @param {*} projectID of the project
 * @param {*} projectName as the new name of the Project
 * 1) function takes the projectID and projectName as inputs
 * 2) query will update the name of the project with the matching projectID 
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_PROJECT_NAME', async (pID,pName) => {
            const result = await projectController.updateProjectName(pID,pName);
            client.emit('UPDATE_PROJECT_NAME', result);
       })
 */
async function updateProjectName(projectID, projectName) {
    return new Promise(async resolve => {

        client.query('UPDATE Projects SET ProjectName = ?  WHERE ProjectID = ?; ', [projectName, projectID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateProjectName function called");
            resolve(projectName);
        });
    })
}


//Function to updateProjectName
//this function will update the projectname
/**
 * @param {*} projectID of the project
 * @param {*} dueDate as the new due daten for the Project
 * 1) function takes the projectID and dueDate as inputs
 * 2) query will update the due date of the project with the matching projectID 
 * 3) this function should be called from front end as follows 
 * 
 *    client.on('USER_UPDATE_PROJECT_DUEDATE', async (pID,pDueDate) => {
            const result = await projectController.updateProjectDueDate(pID,pDueDate);
            client.emit('UPDATE_PROJECT_DUEDATE', result);
        })
 */
async function updateProjectDueDate(projectID, dueDate) {
    return new Promise(async resolve => {
        //console.log('Backend PID:', projectID, ' duedate:',dueDate);
        client.query('UPDATE Projects SET DueDate = ?  WHERE ProjectID = ?; ', [dueDate, projectID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateProjectDueDate function called");
            resolve(dueDate);
        });
    })
}


//Function to mark project as deleted
//this function will update the status of the project
/**
 * @param {*} projectID of the project
 * @param {*} isDeleted as boolean true -> deleted project, false -> active project
 * 1) function takes the projectID and isDeleted as inputs
 * 2) query will update isDeleted attribute of the project with the matching projectID 
 * 3) this function should be called from front end as follows 
 * 4) we should only allows this option to be available for users with the admin rights to a project  
 * 
 *    client.on('USER_UPDATE_PROJECT_ISDELETED', async (pID,pIsDeleted) => {
            const result = await projectController.updateProjectIsDeleted(pID,pIsDeleted);
            client.emit('UPDATE_PROJECT_ISDELETED', result);
        })
 */
async function updateProjectIsDeleted(projectID, isDeleted) {
    return new Promise(async resolve => {
        //console.log("ProjectID:", projectID);
        //console.log('IsDeleted:',isDeleted);
        client.query('UPDATE Projects SET IsDeleted = ?  WHERE ProjectID = ?; ', [isDeleted, projectID], async function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            //console.log("updateProjectIsDeleted function called");
            listOfProjects.forEach(project => {
                if (project.getProjectID == projectID)
                    project.setIsDeleted = isDeleted;
            })
             resolve(isDeleted);
            //console.log(results);
        });
        
    })
}


async function updateDeleteProjectDependencies(projectID, isDeleted){
    
    return new Promise(async resolve => {
        client.query('SELECT T.TaskID FROM Tasks T JOIN Categories C ON T.CategoryID = C.CategoryID WHERE C.ProjectID =?;',[projectID], async function (error, result, fields){
            if(error) throw error;
            //console.log(result)
            const res = await updateProjectIsDeleted(projectID, isDeleted);
            //console.log('ProjectID:', projectID, ' is now marked as ', res);
            for (task of result) {
                //console.log('task:',task);
                const elt = await taskController.updateIsDeleted(task.TaskID, isDeleted);
                //console.log('task delete:', task.TaskID, ' is marked as ', elt );
            }

            //console.log(result);
            resolve(result)
        })
    });
}


async function getuserprev(projectID, userID){
    return new Promise((resolve, reject) => {
        //console.log(projectID, userID);
       client.query('SELECT AccountTypeID FROM ProjectUsers WHERE UserID = ? and ProjectID=?', [userID, projectID], function (error, results, fields) {
            if(error) throw error;   
            resolve(results);
       });
    })
}


async function getprojectdetail(projectID){
    return new Promise((resolve, reject)=>{
        client.query('Select P.ProjectID, P.ProjectName, P.DateCreated, P.DueDate, P.IsDeleted, PU.UserID From Projects P JOIN ProjectUsers PU on PU.ProjectID = P.ProjectID where P.ProjectID = ?', [projectID], function (error, results, fields) {
            //console.log('Retrieveing information for ProjectID:', projectID);
            if(error) throw error;
            resolve(results);
        } )
    })
}



async function addusertoproject(projectID, userID,userType){
    return new Promise((resolve, reject) => {
        //console.log('projectID, userID, userType', projectID, userID, userType);
       client.query('INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) VALUES(?,?,?)', [userID, projectID, userType], function (error, results, fields) {
        if(error) throw error;  
        //console.log('User is added:',results); 
            resolve(results);
       });
    })
}



async function getpriority(){
    return new Promise((resolve, reject)=>{
        //console.log('Getting priorities');
        client.query('Select PriorityID, Priority From Priority', function(error,results, fields){
            if(error) throw error;
            resolve(results);
        })
    })
};

async function getlevel(){
    return new Promise((resolve, reject)=>{
        //console.log('Getting levels');
        client.query('Select AccountTypeID, TypeName From AccountType', function(error,results, fields){
            if(error) throw error;
            resolve(results);
        })
    })
};

async function getListOfAvailableUser(projectID, userID){
    return new Promise(async (resolve, reject) => {
        client.query('SELECT U.UserID, U.username FROM Users U WHERE U.UserID NOT IN (SELECT PU.UserID FROM ProjectUsers PU WHERE PU.ProjectID = ?)', [projectID], function(error, result, fields){    
        if(error) throw error;
            //console.log('Project ID:', projectID);
            //console.log('UserID:', userID);
            //console.log('result:', result);
            resolve(result);
        })

    })
};


async function getListOfAvailableUserForProject(projectID){
    return new Promise(async (resolve, reject) => {
        client.query('SELECT U.UserID, U.username FROM Users U WHERE U.UserID IN (SELECT PU.UserID FROM ProjectUsers PU WHERE PU.ProjectID = ?)', [projectID], function(error, result, fields){    
        if(error) throw error;
            resolve(result);
        })
    })
};

async function gettaskstatus(){
    return new Promise(async (resolve, reject) => {
        client.query('SELECT * FROM TaskStatus', function(error, result, fields){    
        if(error) throw error;
            resolve(result);
        })
    })
};

            
module.exports = {
    insertNewProject: insertNewProject,
    findProjectID: findProjectID,
    getListofProjects: getListOfProjects,
    updateProjectName: updateProjectName,
    updateProjectDueDate: updateProjectDueDate,
    updateProjectIsDeleted: updateProjectIsDeleted,
    updateDeleteProjectDependencies:updateDeleteProjectDependencies,
    getCategories: getCategories,
    addCategory: addCategory,
    getuserprev:getuserprev,
    addusertoproject:addusertoproject,
    getpriority:getpriority,
    getlevel:getlevel,
    getprojectdetail:getprojectdetail,
    getListOfAvailableUser:getListOfAvailableUser,
    getListOfAvailableUserForProject:getListOfAvailableUserForProject,
    gettaskstatus:gettaskstatus
}
