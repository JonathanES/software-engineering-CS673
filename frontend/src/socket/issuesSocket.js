import { socket } from './config';
import {createIssueCallback,
        deleteIssueCallback,
        getIssuesCallback,
        getCommentsForIssueCallback,
        getIssueWithIDCallback,
        createNewIssueStatusCallback,
        updateProjectIDCallback,
        updateIssueStatusCallback,
        updateAssigneeIDCallback,
        updateAssignedToIDCallback,
        updatePriorityIDCallback,
        updateIssueNameCallback,
        updateIssueSummaryCallback,
        updateLastUpdateCallback,
        updateDateResolvedCallback,
        updateIsResolvedCallback
        } from "../components/issue-design/issuesHandler.js";


//// GENERAL FUNCTIONS (For use within mostly issueCardGrid) ///
// Each method here has their callback as a default argument, and can be overwritten later but otherwise will not need an argument passed for the callback if using default found in issuesHandler
function createIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID, cb=createIssueCallback) {
    socket.emit('CREATE_NEW_ISSUE', issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);
    socket.on('CREATED_NEW_ISSUE', data => cb(data));
}

function deleteIssue(issueID, cb=deleteIssueCallback){
    socket.emit('DELETE_ISSUE_WITH_ID', issueID);
    socket.on('DELETED_ISSUE_WITH_ID', data => cb(data));
}

function getIssues(cb=getIssuesCallback) {
    socket.emit('GET_ISSUES');
    socket.on('GOT_ISSUES', data => cb(data));
}

function getCommentsForIssue(issueID, cb=getCommentsForIssueCallback){
    socket.emit('GET_COMMENTS_FOR_ISSUE_WITH_ID', issueID);
    socket.on('GOT_COMMENTS_FOR_ISSUE_WITH_ID', data => cb(data));
}

function getIssueWithID(issueID, cb=getIssueWithIDCallback) {
    socket.emit('GET_ISSUE_WITH_ID', issueID);
    socket.on('GOT_ISSUE_WITH_ID', data => cb(data));
}

function createNewIssueStatus(status, cb=createNewIssueStatusCallback) {
    socket.emit('CREATE_NEW_ISSUE_STATUS', status);
    socket.on('CREATED_NEW_ISSUE_STATUS', data => cb(data));
}


//// UPDATE FUNCTIONS (For use in issueCard) ///
// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted
function updateProjectID(issueID, projectID, cb=updateProjectIDCallback){
    socket.emit('UPDATE_PROJECTID_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_PROJECTID_ON_ISSUE_WITH_ID', data => cb(data));
}

// TODO: Change this event in the backend too
function updateIssueStatus(issueID, newStatusID, cb=updateIssueStatusCallback) {
    socket.emit('UPDATE_ISSUE_STATUS_ON_ISSUE_WITH_ID', issueID, newStatusID);
    socket.on('UPDATED_ISSUE_STATUS_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateAssigneeID(issueID, assigneeID, cb=updateAssigneeIDCallback){
    socket.emit('UPDATE_ASSIGNEEID_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_ASSIGNEEID_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateAssignedToID(issueID, assignedToID, cb=updateAssignedToIDCallback){
    socket.emit('UPDATE_ASSIGNEDTOID_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_ASSIGNEDTOID_ON_ISSUE_WITH_ID', data => cb(data));
}

function updatePriorityID(issueID, PriorityID, cb=updatePriorityIDCallback){
    socket.emit('UPDATE_PRIORITYID_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_PRIORITYID_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateIssueName(issueID, issueName, cb=updateIssueNameCallback){
    socket.emit('UPDATE_ISSUENAME_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_ISSUENAME_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateIssueSummary(issueID, summary, cb=updateIssueSummaryCallback){
    socket.emit('UPDATE_ISSUESUMMARY_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_ISSUESUMMARY_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateLastUpdate(issueID, lastUpdate, cb=updateLastUpdateCallback){
    socket.emit('UPDATE_LASTUPDATE_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_LASTUPDATE_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateDateResolved(issueID, dateResolved, cb=updateDateResolvedCallback){
    socket.emit('UPDATE_DATERESOLVED_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_DATERESOLVED_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateIsResolved(issueID, isResolved, cb=updateIsResolvedCallback){
    socket.emit('UPDATE_ISRESOLVED_ON_ISSUE_WITH_ID', issueID);
    socket.on('UPDATED_ISRESOLVED_ON_ISSUE_WITH_ID', data => cb(data));
}

export {createIssue,
        deleteIssue,
        getIssues,
        getCommentsForIssue,
        getIssueWithID,
        createNewIssueStatus,
        updateProjectID,
        updateIssueStatus,
        updateAssigneeID,
        updateAssignedToID,
        updatePriorityID,
        updateIssueName,
        updateIssueSummary,
        updateLastUpdate,
        updateDateResolved,
        updateIsResolved
        };
