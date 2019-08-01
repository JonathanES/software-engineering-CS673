import { socket } from './config';
import {createIssueCallback,
        deleteIssueCallback,
        getIssuesCallback,
        createCommentForIssueCallback,
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
    socket.once('CREATED_NEW_ISSUE', data => cb(data));
}

function deleteIssue(issueID, cb=deleteIssueCallback){
    socket.emit('DELETE_ISSUE_WITH_ID', issueID);
    socket.once('DELETED_ISSUE_WITH_ID', data => cb(data));
}

function getIssues(cb=getIssuesCallback) {
    socket.emit('GET_ISSUES');
    socket.once('GOT_ISSUES', data => cb(data));
}

function createCommentForIssue(issueID, creatorID, commentText, cb=createCommentForIssueCallback){
    socket.emit("CREATE_COMMENT_FOR_ISSUE_WITH_ID");
    socket.once("CREATED_COMMENT_FOR_ISSUE_WITH_ID", data => cb(data));
}

function getCommentsForIssue(issueID, cb=getCommentsForIssueCallback){
    socket.emit('GET_COMMENTS_FOR_ISSUE_WITH_ID', issueID);
    socket.once('GOT_COMMENTS_FOR_ISSUE_WITH_ID', data => cb(data));
}

function getComments(cb){
    socket.emit('GET_COMMENTS');
    socket.once('GOT_COMMENTS', data => cb(data));
}

function getIssueWithID(issueID, cb=getIssueWithIDCallback) {
    socket.emit('GET_ISSUE_WITH_ID', issueID);
    socket.once('GOT_ISSUE_WITH_ID', data => cb(data));
}

function createNewIssueStatus(status, cb=createNewIssueStatusCallback) {
    socket.emit('CREATE_NEW_ISSUE_STATUS', status);
    socket.once('CREATED_NEW_ISSUE_STATUS', data => cb(data));
}


//// UPDATE FUNCTIONS (For use in issueCard) ///
// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted
function updateProjectID(issueID, projectID, cb=updateProjectIDCallback){
    socket.emit('UPDATE_PROJECTID_ON_ISSUE_WITH_ID', issueID, projectID);
    socket.once('UPDATED_PROJECTID_ON_ISSUE_WITH_ID', data => cb(data));
}


function updateIssueStatus(issueID, newStatusID, cb=updateIssueStatusCallback) {
    socket.emit('UPDATE_ISSUE_STATUS_ON_ISSUE_WITH_ID', issueID, newStatusID);
    socket.once('UPDATED_ISSUE_STATUS_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateAssigneeID(issueID, assigneeID, cb=updateAssigneeIDCallback){
    socket.emit('UPDATE_ASSIGNEEID_ON_ISSUE_WITH_ID', issueID, assigneeID);
    socket.once('UPDATED_ASSIGNEEID_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateAssignedToID(issueID, assignedToID, cb=updateAssignedToIDCallback){
    socket.emit('UPDATE_ASSIGNEDTOID_ON_ISSUE_WITH_ID', issueID, assignedToID);
    socket.once('UPDATED_ASSIGNEDTOID_ON_ISSUE_WITH_ID', data => cb(data));
}

function updatePriorityID(issueID, priorityID, cb=updatePriorityIDCallback){
    socket.emit('UPDATE_PRIORITYID_ON_ISSUE_WITH_ID', issueID, priorityID);
    socket.once('UPDATED_PRIORITYID_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateIssueName(issueID, issueName, cb=updateIssueNameCallback){
    socket.emit('UPDATE_ISSUENAME_ON_ISSUE_WITH_ID', issueID, issueName);
    socket.once('UPDATED_ISSUENAME_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateIssueSummary(issueID, summary, cb=updateIssueSummaryCallback){
    socket.emit('UPDATE_ISSUESUMMARY_ON_ISSUE_WITH_ID', issueID, summary);
    socket.once('UPDATED_ISSUESUMMARY_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateLastUpdate(issueID, lastUpdate, cb=updateLastUpdateCallback){
    socket.emit('UPDATE_LASTUPDATE_ON_ISSUE_WITH_ID', issueID, lastUpdate);
    socket.once('UPDATED_LASTUPDATE_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateDateResolved(issueID, dateResolved, cb=updateDateResolvedCallback){
    socket.emit('UPDATE_DATERESOLVED_ON_ISSUE_WITH_ID', issueID, dateResolved);
    socket.once('UPDATED_DATERESOLVED_ON_ISSUE_WITH_ID', data => cb(data));
}

function updateIsResolved(issueID, isResolved, cb=updateIsResolvedCallback){
    socket.emit('UPDATE_ISRESOLVED_ON_ISSUE_WITH_ID', issueID, isResolved);
    socket.once('UPDATED_ISRESOLVED_ON_ISSUE_WITH_ID', data => cb(data));
}

export {createIssue,
        deleteIssue,
        getIssues,
        createCommentForIssue,
        getCommentsForIssue,
        getComments,
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
