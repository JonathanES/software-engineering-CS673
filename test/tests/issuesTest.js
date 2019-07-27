/// Issues Test File - Tests issues table in the database and associated files ///
/// CONSTANTS /// - These should really be capitcal camel case
const assert = require("chai").assert;
const io = require("socket.io-client");
const server = require("../../server.js")
const socketUrl = "http://localhost:8000"
const db = require("../../backend/config/database")
const moment = require("moment")

const dbclient = require("../../backend/config/database");

const options = {
    transports: ['websocket'],
    'force new connection': true
};

async function getCommentWithID(commentID){
    return new Promise(async (resolve, reject) => {
        dbclient.query("SELECT * FROM Comments WHERE CommentID = ?",
                        [commentID],
                        async (error, results, fields) => {
                            if (error) throw error;
                            resolve(results[0]);
                        });
    });
}

describe("Testing the IssueController with socket conenction", () => {
    // Test 1 - Issue Creation
    it("Should create a new issue and retrieve new Issue from ID", (done) => {
        // Setup client connection to backend
        let client = io.connect(socketUrl, options);
        let issueID = 2; // Will get overwritten which is what we want
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

            // Await response from server from CREATE_NEW_ISSUE Command
            client.on("CREATED_NEW_ISSUE", (data) => {
                assert.notEqual(data, 0, "Returned RowID was 0!");
                issueID = data;

                // Emit here so it doesn't emit before we get the data back
                client.emit("GET_ISSUE_WITH_ID", issueID);
            });

            // Await response from server from GET_ISSUE_WITH_ID
            client.on("GOT_ISSUE_WITH_ID", (data) => {
                assert.equal(data.IssueID, issueID, "IssueIDs are not equal");
                assert.equal(data.IssueName, issueName, "IssueNames are not equal");
                assert.equal(data.Summary, issueSummary, "IssueSummaries are not equal");
                assert.equal(data.ProjectID, projectID, "ProjectIDs are not equal");
                assert.equal(data.IssueStatusID, issueStatusID, "IssueStatusIDs are not equal");
                assert.equal(data.AssigneeID, userID, "UserIDs are not equal");
                assert.equal(data.AssignedToID, responsibleUserID, "ResponsibleUserIDs are not equal");
                assert.equal(data.PriorityID, priorityID, "PriorityIDs are not equal");
                done();
            });
        });
    });

    // Test 2 - Issue Deletion
    it("Should create a new issue and then delete the issue", (done) => {
        let client = io.connect(socketUrl, options);
        let issueID = 2 // Will get overwritten

        const issueName = "Delete me Seymour!";
        const issueSummary = "Litle Shop of Horrors";
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

            // Await response from server from CREATE_NEW_ISSUE Command
            client.on("CREATED_NEW_ISSUE", (data) => {
                assert.notEqual(data, 0, "Returned RowID was 0!");
                issueID = data;

                // Emit delete issue here so it happens after we know the issue has been created
                client.emit("DELETE_ISSUE_WITH_ID", issueID);
            });

            client.on("DELETED_ISSUE_WITH_ID", data => {
                assert.equal(data, 1, "We deleted more or less than 1 row!"); // The data is the number of changes rows
                done();
            });
        });
    });

    // Test 3 - Get all issues
    it("Should get all the issues in the database", (done) => {
        // Setup client connection to backend
        let client = io.connect(socketUrl, options);
        let issueID = 1; // Temp value ofc, it get's updated later
        const issueName = "Get Issues Test";
        const issueSummary = "We gonna have at least one in hereeeeeeee boiiiiiii";
        const projectID = 1;
        const issueStatusID = 1;
        const newIssueStatusID = 1;
        const userID = 1;
        const responsibleUserID = 1;
        const priorityID = 1;

        // Wait for connection to backend
        client.on("connect", async () => {
            // Send creation command to server
            // In order: issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID
            client.emit("CREATE_NEW_ISSUE", issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);

            // Await response from server from CREATE_NEW_ISSUE Command so we at least have on in the database
            client.on("CREATED_NEW_ISSUE", (data) => {
                assert.notEqual(data, 0, "Returned RowID was 0!");
                issueID = data;

                // Emit here so it doesn't emit before we get the data back
                client.emit("GET_ISSUES");
            });

            // Once we get the issues back from the server
            client.on("GOT_ISSUES", (data) => {
                assert.isAtLeast(data.length, 1, "Issues returned is less than 1! There should be at least 1!")
                done();
            });
        });
    });

    // Test 4 - Adding a comment
    it("Should attach a comment and then retrieve the comment for the issue", (done) => {
        // Setup client connection to backend
        let client = io.connect(socketUrl, options);
        let commentID = 1; // Will be overwritten
        const issueID = 1; // Use the test / blank ID
        const taskID = 1; // This shall be always 1 for our comments
        const creatorID = 1;
        const commentText = "Heyy find singles in your area!";
        const isDeleted = 0;

        client.on("connect", async () => {
            // Once connected send command to server
            client.emit("CREATE_COMMENT_FOR_ISSUE_WITH_ID", issueID, creatorID, commentText);

            client.on("CREATED_COMMENT_FOR_ISSUE_WITH_ID", async (data) => { // Have to add the async since we are calling an async function and then need to await the data to then assert the values
                assert.notEqual(data, null, "Returned commentID was null!");
                commentID = data;

                const insertedCommentData = await getCommentWithID(commentID);
                assert.equal(insertedCommentData.CommentID, commentID, "CommentIDs are not equal");
                assert.equal(insertedCommentData.IssueID, issueID, "IssueIDs are not equal");
                assert.equal(insertedCommentData.TaskID, taskID, "TaskID is not 1");
                assert.equal(insertedCommentData.CreatedBy, creatorID, "CreatedBy field is not equal to creatorID");
                assert.notEqual(insertedCommentData.DateCreated, null, "DateCreated is null");
                assert.equal(insertedCommentData.Message, commentText, "Message does not equal commentText");
                assert.equal(insertedCommentData.IsDeleted, isDeleted, "IsDeleted is set to 1 and not 0");
                done();
            });
        });
    });

    // Test 5 - Getting an individual issue
    it("Should get the first blank issue (#1) in the database", (done) => {
        // Setup client connection to backend
        let client = io.connect(socketUrl, options);
        const issueID = 1;
        const projectID = 1;
        const issueStatusID = 1;
        const assigneeID = 1;
        const assignedToID = 1;
        const priorityID = 1;
        const issueName = "Test";
        const summary = "Test";
        const dateCreated = "2010-01-01 00:00:00";
        const lastUpdate = "2010-01-01 00:00:00";
        const dateResolved = null;
        const isResolved = 0;
        const isDeleted = 0;

        client.on("connect", async () => {
            client.emit("GET_ISSUE_WITH_ID", 1);

            client.on("GOT_ISSUE_WITH_ID", (data) => {
                assert.equal(data.IssueID, issueID, "IssueIDs are not equal");
                assert.equal(data.ProjectID, projectID, "ProjectIDs are not equal");
                assert.equal(data.IssueStatusID, issueStatusID, "IssueStatusIDs are not equal");
                assert.equal(data.AssigneeID, assigneeID, "AssigneeIDs are not equal");
                assert.equal(data.AssignedToID, assignedToID, "AssignedToIDs are not equal");
                assert.equal(data.PriorityID, priorityID, "PriorityIDs are not equal");
                assert.equal(data.IssueName, issueName, "IssueNames are not equal");
                assert.equal(data.Summary, summary, "Summaries are not equal");
                //assert.equal(data.DateCreated, dateCreated, "Creation dates are not equal"); // These cant be tested since the server is on another time zone still :(
                //assert.equal(data.LastUpdate, lastUpdate, "LastUpdates are not equal");
                assert.equal(data.DateResolved, dateResolved, "Resolved dates are not equal");
                assert.equal(data.IsResolved, isResolved, "IsResolveds are not equal");
                assert.equal(data.IsDeleted, isDeleted, "IsDeleteds are not equal");
                done();
            });
        });
    });

    // Test 6
    it("Should create a new issue and update the project ID");

    // Test 7
    it("Should create a new issue and then update the issue's status", (done) => {
        // Setup client connection to backend
        let client = io.connect(socketUrl, options);
        let issueID = 1; // Temp value ofc, it get's updated later
        const issueName = "Update Issue Status Test";
        const issueSummary = "We gonna go from 1 to 2 yeet yeet";
        const projectID = 1;
        const issueStatusID = 1;
        const newIssueStatusID = 2;
        const userID = 1;
        const responsibleUserID = 1;
        const priorityID = 1;

        // Wait for connection to backend
        client.on("connect", async () => {
            // Send command to server
            // In order: issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID
            client.emit("CREATE_NEW_ISSUE", issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID);

            // Await response from server from CREATE_NEW_ISSUE Command
            client.on("CREATED_NEW_ISSUE", (data) => {
                assert.notEqual(data, 0, "Returned RowID was 0!");
                issueID = data;

                // Emit here so it doesn't emit before we get the data back
                client.emit("UPDATE_ISSUE_STATUS_ON_ISSUE_WITH_ID", issueID, newIssueStatusID);
            });

            // Once we updated the IssueStatusID get the row back and check
            client.on("UPDATED_ISSUE_STATUS_ON_ISSUE_WITH_ID", (data) => {
                assert.equal(data, 1, "We returned more than 1 changed row! SOMIT SCHLECHT!");

                // If we have changed a row, lets get the row back, here we know that we have the issueID from before since this occurs after the insert
                client.emit("GET_ISSUE_WITH_ID", issueID);
            });

            // Await response from server from GET_ISSUE_WITH_ID
            client.on("GOT_ISSUE_WITH_ID", (data) => {
                assert.equal(data.IssueID, issueID, "IssueIDs are not equal");
                assert.equal(data.IssueName, issueName, "IssueNames are not equal");
                assert.equal(data.Summary, issueSummary, "IssueSummaries are not equal");
                assert.equal(data.ProjectID, projectID, "ProjectIDs are not equal");
                assert.equal(data.IssueStatusID, newIssueStatusID, "IssueStatusIDs are not equal"); // Check the new ID!
                assert.equal(data.AssigneeID, userID, "UserIDs are not equal");
                assert.equal(data.AssignedToID, responsibleUserID, "ResponsibleUserIDs are not equal");
                assert.equal(data.PriorityID, priorityID, "PriorityIDs are not equal");
                done();
            });
        });
    });

    // Test 8
    it("Should create a new issue and then update the assignee ID");

    // Test 9
    it("Should create a new issue and then update the assignedTo ID");

    // Test 10
    it("Should create a new issue and then update the priority ID");

    // Test 11
    it("Should create a new issue and then update the issue name");

    // Test 12
    it("Should create a new issue and then update the issue summary");

    // Test 13
    it("Should create a new issue and then update the last update field");

    // Test 14
    it("Should create a new issue and then update the date resolved field");

    // Test 15
    it("Should create a new issue and then up the is resolved field");
});
