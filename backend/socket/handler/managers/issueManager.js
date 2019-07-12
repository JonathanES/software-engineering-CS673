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
         * @returns {number} Inserted Row's Primary Key
         */
        client.on("CREATE_NEW_ISSUE", async (issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID) => {
            const result = await issueController.createNewIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);
            client.emit("CREATED_NEW_ISSUE", result); // Send back confirmation
        });

        // Method to update an Issue's Status to a new Status
        /**
         * This API call updates an Issue's status in the database
         * @name UPDATE_ISSUE_STATUS
         * @param {number} issueID The ID of the Issue whose status you want to update
         * @param {number} newStatusID An issueStatusID number to set the new issueStatus of the Issue
         * @returns {number} Returns the count/number of changed rows in the database
         */
        client.on("UPDATE_ISSUE_STATUS", async (issueID, newStatusID) => {
            const result = await issueController.updateIssueStatus(issueID, newStatusID);
            client.emit("UPDATED_ISSUE_STATUS", result);
        });

         // Empty & Populate Issues Array and return Issues from MySQL database
         /**
         * @name GET_ISSUES
         * This API call returns all the Issues in the DB in an array
         * @returns {array} Returns an array with all the Row objects in the Issues table
         */
        client.on("GET_ISSUES", async () => {
            const result = await issueController.getIssues();
            client.emit("GOT_ISSUES", result);
        });

         // Get and return a particular row in the issue table from ID (PK)
         /**
         * This API call gets a specific Issue from the DB
         * @name GET_ISSUE_WITH_ID
         * @param {number} issueID The ID of the Issue you are interested in
         * @returns {object} Returns the row object of the IssueID specified
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
         */
        client.on("CREATE_NEW_ISSUE_STATUS", async (status) => {
            const result = await issueController.createNewIssueStatus(status);
            client.emit("CREATED_NEW_ISSUE_STATUS", result);
        });
    })
}
