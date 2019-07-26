import { socket } from './config';
import {createIssueCallback, updateIssueStatusCallback, getIssuesCallback, getIssueWithIDCallback, createNewIssueStatusCallback} from "../components/issue-design/issuesHandler.js";
// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted

/// GENERAL FUNCTIONS (For use within mostly issueCardGrid)

// Each method here has their callback as a default argument, and can be overwritten later but otherwise will not need an argument passed for the callback if using default found in issuesHandler
function createIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID, cb=createIssueCallback) {
    socket.emit('CREATE_NEW_ISSUE', issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);
    socket.on('CREATED_NEW_ISSUE', data => cb(null, data));
}

function deleteIssue(issueID, cb=deleteIssueCallback){

}

function getIssues(cb=getIssuesCallback) {
    socket.emit('GET_ISSUES');
    socket.on('GOT_ISSUES', data => cb(null, data));
}

function getCommentsForIssue(issueID, cb=getCommentsForIssueCallback){

}

function getIssueWithID(issueID, cb=getIssueWithIDCallback) {
    socket.emit('GET_ISSUE_WITH_ID', issueID);
    socket.on('GOT_ISSUE_WITH_ID', data => cb(null, data));
}

function createNewIssueStatus(status, cb=createNewIssueStatusCallback) {
    socket.emit('CREATE_NEW_ISSUE_STATUS', status);
    socket.on('CREATED_NEW_ISSUE_STATUS', data => cb(null, data));
}

/// UPDATE FUNCTIONS (For use in issueCard)
// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted
function updateProjectID(issueID, projectID, cb=updateProjectIDCallback){

}

function updateIssueStatus(issueID, newStatusID, cb=updateIssueStatusCallback) {
    socket.emit('UPDATE_ISSUE_STATUS', issueID, newStatusID);
    socket.on('UPDATED_ISSUE_STATUS', data => cb(null, data));
}

function updateAssigneeID(issueID, assigneeID, cb=updateAssigneeIDCallback){

}

function updateAssignedToID(issueID assignedToID, cb=updateAssignedToIDCallback){

}

function updatePriorityID(issueID, PriorityID, cb=updatePriorityIDCallback){

}

function updateIssueName(issueID, issueName, cb=updateIssueNameCallback){

}

function updateIssueSummary(issueID, summary, cb=updateIssueSummaryCallback){

}

function updateLastUpdate(issueID, lastUpdate, cb=updateLastUpdateCallback){

}

function updateDateResolved(issueID, dateResolved, cb=updateDateResolvedCallback){

}

function updateIsResolved(issueID, isResolved, cb=updateIsResolvedCallback){

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
