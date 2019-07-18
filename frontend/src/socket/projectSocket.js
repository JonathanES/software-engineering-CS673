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

function showCategories(projectID, cb){
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


export {addProject, getListOfProjects, showCategories, addCategory, getAddtoProject, getPriorities, getUserLevel, getprojectdetail};