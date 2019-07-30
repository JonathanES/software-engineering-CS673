/**
 * file that lets us send socket request to the backend and retrieve the information from the backend
 */
import {socket} from './config'


function addProject(userID, pname, duedate, cb){
    socket.on('CREATE_PROJECT', data => cb(null, data) );
    socket.emit('USER_CREATE_PROJECT', userID, pname, duedate);
}

function getListOfProjects(userID, cb){
    socket.on('GET_PROJECTLIST', data => cb(null, data) );
    socket.emit('USER_GET_PROJECTLIST',userID);
}

// function showCategories(projectID){
//     socket.emit('USER_GET_PROJECTCATEGORIES',projectID);
// }

function showCategories_old(projectID, cb){
    socket.on('GET_PROJECTCATEGORIES', data => cb(null, data) );
    socket.emit('USER_GET_PROJECTCATEGORIES',projectID);
}

function addCategory(projectID, projectName, cb){
    socket.on('ADD_CATEGORY', data => cb(null, data));
    socket.emit('USER_ADD_CATEGORY',projectID, projectName);
}

function getAddtoProject(projectID, userID, userType, cb){
    socket.on('ADD_USERTOPROJECT', data => cb(null, data));
    socket.emit('USER_ADD_USERTOPROJECT',projectID, userID, userType);
}

function getPriorities(cb){
    socket.on('GET_PRIORITIES', data => cb(null, data));
    socket.emit('USER_GET_PRIORITIES');
}

function getUserLevel(cb){
    socket.on('GET_USERLEVEL', data => cb(null, data));
    socket.emit('USER_GET_USERLEVEL');
}

function getprojectdetail(projectID, cb){
    socket.on('GET_PROJECTDETAIL', data => cb(null, data));
    socket.emit('USER_GET_PROJECTDETAIL',projectID);
}

function getAvailableUsers(projectID, userID, cb){
    socket.on('AVAILABLEUSER', data => cb(null, data));
    socket.emit('GET_AVAILABLEUSER', projectID, userID);
  }


  function getAvailableUsersForProject(projectID, cb){
    socket.on('AVAILABLE_USER_FOR_PROJECT', data => cb(null, data));
    socket.emit('GET_AVAILABLE_USER_FOR_PROJECT', projectID);
  }


  function deleteproject(projectID, isDeleted, cb){
      socket.on('UPDATE_PROJECT_ISDELETED', data=> cb(null,data));
      socket.emit('USER_UPDATE_PROJECT_ISDELETED', projectID, isDeleted);
  }

  function updateDeleteProjectDependencies(projectID, isDeleted, cb){
      socket.on('DELETE_PROJECT_DEPENDENCIES', data => cb(null,data));
      socket.emit('USER_DELETE_PROJECT_DEPENDENCIES', projectID, isDeleted);
}

  function updateProjectName(projectID, projectName,cb){
      console.log('socket props projectID:', projectID, '  and new name:', projectName);
      socket.on('UPDATE_PROJECT_NAME', data => cb(null,data));
      socket.emit('USER_UPDATE_PROJECT_NAME', projectID, projectName);
  }

  function updateProjectDueDate(projectID, dueDate, cb){
    socket.on('UPDATE_PROJECT_DUEDATE', data => cb(null,data));
    socket.emit('USER_UPDATE_PROJECT_DUEDATE', projectID, dueDate);
}

function getStatus(cb){
    socket.on('TASK_STATUS', data => cb(null, data));
    socket.emit('GET_TASK_STATUS');
}


export {addProject, getListOfProjects, addCategory, getAddtoProject, getPriorities, 
    getUserLevel, getprojectdetail,getAvailableUsers, showCategories_old, deleteproject,
    updateProjectName, updateProjectDueDate,getStatus, updateDeleteProjectDependencies, getAvailableUsersForProject
};