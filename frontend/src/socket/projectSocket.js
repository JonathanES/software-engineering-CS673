/**
 * file that lets us send socket request to the backend and retrieve the information from the backend
 */
import {socket} from './config'

function addproject(userID, pname, duedate, cb){
    socket.on('ADD_PROJECT', data => cb(null, data) );
    socket.emit('USER_ADD_PROJECT', userID, pname, duedate);
}

function getProjects(userID, cb){
    socket.on('PROJECTS', data => cb(null, data) );
    socket.emit('USER_PROJECTS',userID);
}

export {addproject, getProjects};