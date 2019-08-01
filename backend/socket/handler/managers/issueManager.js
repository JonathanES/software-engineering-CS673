//// REQUIREMENTS ////
// Require the issue controller
const issueController = require("../../../controller/issueController");

// Exports for socket interface -- Not sure why we can't create a dedicated function here? @Jonathan
module.exports = (io) => {
    // On Socket connection
    io.on("connection", (client) => {
        /// Provide responses to frontend API calls ///
         /**
         * This API call allows a new issue to be made in the DB
         * @name CREATE_NEW_ISSUE
         * @param {string} issueName Any name
         * @param {string} issueSummary Any summary
         * @param {number} projectID A projectID number
         * @param {number} issueStatusID An issueStatusID number
         * @param {number} userID A userID number
         * @param {number} responsibleUserID A userID number who is responible for the Issue
         * @param {number} priorityID A priorityID number to give a priority to the Issue
         * @returns {number} CREATED_NEW_ISSUE: Inserted Row's Primary Key
         */
        client.on("CREATE_NEW_ISSUE", async (issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID) => {
            const result = await issueController.createNewIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);
            client.emit("CREATED_NEW_ISSUE", result); // Send back confirmation
        });

        client.on("DELETE_ISSUE_WITH_ID", async (issueID) => {
            const result = await issueController.deleteIssue(issueID);
            client.emit("DELETED_ISSUE_WITH_ID", result);
        });

         // Empty & Populate Issues Array and return Issues from MySQL database
         /**
         * This API call returns all the Issues in the DB in an array
         * @name GET_ISSUES
         * @returns {array} GOT_ISSUES: Returns an array with all the row objects in the Issues table
         */
        client.on("GET_ISSUES", async () => {
            const result = await issueController.getIssues();
            client.emit("GOT_ISSUES", result);
        });

        client.on("CREATE_COMMENT_FOR_ISSUE_WITH_ID", async (issueID, creatorID, commentText) => {
            const result = await issueController.createCommentForIssue(issueID, creatorID, commentText);
            client.emit("CREATED_COMMENT_FOR_ISSUE_WITH_ID", result);
        });

        client.on("GET_COMMENTS_FOR_ISSUE_WITH_ID", async (issueID) => {
            const result = await issueController.getCommentsForIssue(issueID);
            client.emit("GOT_COMMENTS_FOR_ISSUE_WITH_ID", result);
        });

        client.on("GET_COMMENTS", async (issueID) => {
            const result = await issueController.getComments();
            client.emit("GOT_COMMENTS", result);
        });

         // Get and return a particular row in the issue table from ID (PK)
         /**
         * This API call gets a specific Issue from the DB
         * @name GET_ISSUE_WITH_ID
         * @param {number} issueID The ID of the Issue you are interested in
         * @returns {object} GOT_ISSUE_WITH_ID: Returns the row object of the IssueID specified
         */
        client.on("GET_ISSUE_WITH_ID", async (issueID) => {
            const result = await issueController.getIssueWithID(issueID);
            client.emit("GOT_ISSUE_WITH_ID", result);
        });

         // Method to create a new IssueStatus
         /**
         * This API call generates a new IssueStatus type in the DB
         * @name CREATE_NEW_ISSUE_STATUS
         * @param {string} status The name of the status you want to be created in the database
         * @returns {string} CREATED_NEW_ISSUE_STATUS
         */
        client.on("CREATE_NEW_ISSUE_STATUS", async (status) => {
            const result = await issueController.createNewIssueStatus(status);
            client.emit("CREATED_NEW_ISSUE_STATUS", result);
        });

        client.on("UPDATE_PROJECTID_ON_ISSUE_WITH_ID", async (issueID, projectID) => {
            const result = await issueController.updateProjectID(issueID, projectID);
            client.emit("UPDATED_PROJECTID_ON_ISSUE_WITH_ID", result);
        });

        // Method to update an Issue's Status to a new Status
        /**
         * This API call updates an Issue's status in the database
         * @name UPDATE_ISSUE_STATUS
         * @param {number} issueID The ID of the Issue whose status you want to update
         * @param {number} newStatusID An issueStatusID number to set the new issueStatus of the Issue
         * @returns {number} UPDATED_ISSUE_STATUS: Returns the count/number of changed rows in the database
         */
        client.on("UPDATE_ISSUE_STATUS_ON_ISSUE_WITH_ID", async (issueID, newStatusID) => {
            const result = await issueController.updateIssueStatus(issueID, newStatusID);
            client.emit("UPDATED_ISSUE_STATUS_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_ASSIGNEEID_ON_ISSUE_WITH_ID", async (issueID, assigneeID) => {
            const result = await issueController.updateAssigneeID(issueID, assigneeID);
            client.emit("UPDATED_ASSIGNEEID_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_ASSIGNEDTOID_ON_ISSUE_WITH_ID", async (issueID, assignedToID) => {
            const result = await issueController.updateAssignedToID(issueID, assignedToID);
            client.emit("UPDATED_ASSIGNEDTOID_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_PRIORITYID_ON_ISSUE_WITH_ID", async (issueID, priorityID) => {
            const result = await issueController.updatePriorityID(issueID, priorityID);
            client.emit("UPDATED_PRIORITYID_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_ISSUENAME_ON_ISSUE_WITH_ID", async (issueID, issueName) => {
            const result = await issueController.updateIssueName(issueID, issueName);
            client.emit("UPDATED_ISSUENAME_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_ISSUESUMMARY_ON_ISSUE_WITH_ID", async (issueID, summary) => {
            const result = await issueController.updateIssueSummary(issueID, summary);
            client.emit("UPDATED_ISSUESUMMARY_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_LASTUPDATE_ON_ISSUE_WITH_ID", async (issueID, lastUpdate) => {
            const result = await issueController.updateLastUpdate(issueID, lastUpdate);
            client.emit("UPDATED_LASTUPDATE_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_DATERESOLVED_ON_ISSUE_WITH_ID", async (issueID, dateResolved) => {
            const result = await issueController.updateDateResolved(issueID, dateResolved);
            client.emit("UPDATED_DATERESOLVED_ON_ISSUE_WITH_ID", result);
        });

        client.on("UPDATE_ISRESOLVED_ON_ISSUE_WITH_ID", async (issueID, isResolved) => {
            const result = await issueController.updateIsResolved(issueID, isResolved);
            client.emit("UPDATED_ISRESOLVED_ON_ISSUE_WITH_ID", result);
        });
    })
}
