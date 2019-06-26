//// REQUIREMENTS ////
// Require the issue controller
const issueController = require("../../../controller/issueController");

// Exports for socket interface -- Not sure why we can't create a dedicated function here? @Jonathan
module.exports = (io) => {
  // On Socket connection
  io.on("connection", client => {
    /// Provide responses to frontend API calls ///
    client.on("CREATE_NEW_ISSUE", async (issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, commentID, priorityID) => {
      const result = await issueController.createNewIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, commentID, priorityID);
      client.emit("CREATED_NEW_ISSUE", result); // Send back confirmation
    })

    client.on("UPDATE_ISSUE_STATUS", async (issueID, newStatusID) => {
      const result = await issueController.updateIssueStatus(issueID, newStatusID);
      client.emit("UPDATED_ISSUE_STATUS", result);
    })

    client.on("GET_ISSUES", async () => {
      const result = await issueController.getIssues();
      client.emit("GOT_ISSUES", result);
    })

    client.on("CREATE_NEW_ISSUE_STATUS", async (status) => {
      const result = await issueController.createNewIssueStatus(status);
      client.emit("CREATED_NEW_ISSUE_STATUS", result);
    })
  })
}
