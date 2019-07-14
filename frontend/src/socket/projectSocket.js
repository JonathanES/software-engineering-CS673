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

function addCategory(projectID, cb){
    socket.on('ADD_CATEGORY', data => cb(null, data));
    socket.emit('USER_ADD_CATEGORY',projectID);
}

export {addProject, getListOfProjects, showCategories, addCategory};