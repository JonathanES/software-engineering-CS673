import { socket } from './config';
import {createIssueCallback, updateIssueStatusCallback, getIssuesCallback, getIssueWithIDCallback, createNewIssueStatusCallback} from "../components/issue-design/issuesHandler.js";

// Each method here has their callback as a default argument, and can be overwritten later but otherwise will not need an argument passed for the callback if using default found in issuesHandler
function createIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID, cb=createIssueCallback) {
    socket.emit('CREATE_NEW_ISSUE', issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);
    socket.on('CREATED_NEW_ISSUE', data => cb(null, data));
}

function updateIssueStatus(issueID, newStatusID, cb=updateIssueStatusCallback) {
    socket.emit('UPDATE_ISSUE_STATUS', issueID, newStatusID);
    socket.on('UPDATED_ISSUE_STATUS', data => cb(null, data));
}

function getIssues(cb=getIssuesCallback) {
    socket.emit('GET_ISSUES');
    socket.on('GOT_ISSUES', data => cb(null, data));
}

function getIssueWithID(issueID, cb=getIssueWithIDCallback) {
    socket.emit('GET_ISSUE_WITH_ID', issueID);
    socket.on('GOT_ISSUE_WITH_ID', data => cb(null, data));
}

function createNewIssueStatus(status, cb=createNewIssueStatusCallback) {
    socket.emit('CREATE_NEW_ISSUE_STATUS', status);
    socket.on('CREATED_NEW_ISSUE_STATUS', data => cb(null, data));
}


export {createIssue, updateIssueStatus, getIssues, getIssueWithID, createNewIssueStatus};
