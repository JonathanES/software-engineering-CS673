/// Issues Test File - Tests issues table in the database and associated files ///
/// CONSTANTS /// - These should really be capitcal camel case
const assert = require("chai").assert;
const io = require("socket.io-client");
const server = require("../../server.js")
const socketUrl = "http://localhost:8000"
const db = require("../../backend/config/database")
const moment = require("moment")

const options = {
    transports: ['websocket'],
    'force new connection': true
};

describe("Testing the IssueController with socket conenction", () => {
    it("Should create a new issue and retrieve new Issue from ID", (done) => {
        // Setup client connection to backend
        let client = io.connect(socketUrl, options);
        let issueID = 1;
        const issueName = "I GOT 99 PROBLEMS BUT AN ISSUE IN SWELLODESK AINT ONE";
        const issueSummary = "Jay-Z";
        const projectID = 1;
        const issueStatusID = 1;
        const userID = 1;
        const responsibleUserID = 1;
        const priorityID = 1;

        // Wait for connection to backend
        client.on("connect", async () => {
            // Send command to server
            // In order: issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID
            client.emit("CREATE_NEW_ISSUE", issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);

            // Await response
            client.on("CREATED_NEW_ISSUE", (data) => {
                assert.notEqual(0, data, "Returned RowID was 0!");
                issueID = data;

                // Emit here so it doesn't emit before we get the data back
                client.emit("GET_ISSUE_WITH_ID", issueID);
            });

            // Await response
            client.on("GOT_ISSUE_WITH_ID", (data) => {
                assert.equal(issueID, data.IssueID, "IssueIDs are not equal");
                assert.equal(issueName, data.IssueName, "IssueNames are not equal");
                assert.equal(issueSummary, data.Summary, "IssueSummaries are not equal");
                assert.equal(projectID, data.ProjectID, "ProjectIDs are not equal");
                assert.equal(issueStatusID, data.IssueStatusID, "IssueStatusIDs are not equal");
                assert.equal(userID, data.AssigneeID, "UserIDs are not equal");
                assert.equal(responsibleUserID, data.AssignedToID, "ResponsibleUserIDs are not equal");
                assert.equal(priorityID, data.PriorityID, "PriorityIDs are not equal");
                done();
            });
        });
    });
});
