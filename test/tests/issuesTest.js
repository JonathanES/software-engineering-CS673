/// Issues Test File - Tests issues table in the database and associated files ///
/// CONSTANTS /// - These should really be capitcal camel case
const assert = require("chai").assert;
const io = require("socket.io-client");
const server = require("../../server.js")
const socketUrl = "127.0.0.1:8000"
const db = require("../../backend/config/database")
const moment = require("moment")

const options = {
    transports: ['websocket'],
    'force new connection': true
};


/// TESTS ///
// Direct Database tests via db
describe("Tests direct communication with the Issues Table in the DB", () => {
    // UNIT TEST 1
    it("Should create/insert a new Issue", () => {
        const projectID = 1;
        const issueStatusID = 1;
        const assigneeID = 1;
        const assignedToID = 2;
        const commentID = 1;
        const priorityID = 1;
        const issueName = "Test Issue";
        const summary = "This is a test";
        const dateCreated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const lastUpdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const dateResolved = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const isResolved = true;
        const isDeleted = false;

        let issueID = ""; // NOTE: Is this equal to the primary key of the row? I'm unsure here but assuming so

        // Start our query to our DB with our test constants from above
        // Recall we have an auto-increment on the PrimaryKey with label: IssueID
        db.query("INSERT INTO Issues (ProjectID, IssueStatusID, AssigneeID, AssignedToID, CommentID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [projectID, issueStatusID, assigneeID, assignedToID, commentID, priorityID, issueName, summary, dateCreated, lastUpdate, dateResolved, isResolved, isDeleted],
                (error, results, fields) => {  // NOTE: Do I need an async here? -- NO
                    if (error){
                        assert.fail(error.toString()); // Asserts a failure of this test with the MYSQL error given
                    }
                    issueID = results.insertId;
        });
        // Query back our data from the database and check to makesure it all matches our expected constants from above
        db.query("SELECT * FROM Issues WHERE IssueID = ?", [issueID],
                (error, results, fields) => {
                    if (error){
                        assert.fail(error.toString());
                    }
                    assert.equal(1, results.length, "Resulting length from the MYSQL statement was not equal to 1!"); // Check to make sure we get 1 row back, and if not display the error msg
                    const returnedRow = results[0];

                    // Assertions to test each field in the row is correct
                    assert.equal(issueID, returnedRow.IssueID, "Issue IDs are not equal");
                    assert.equal(projectID, returnedRow.ProjectID, "Project IDs are not equal");
                    assert.equal(issueStatusID, returnedRow.IssueStatusID, "IssueStatusIDs are not equal");
                    assert.equal(assigneeID, returnedRow.AssigneeID, "AssigneeIDs are not equal");
                    assert.equal(assignedToID, returnedRow.AssignedToID, "AssignedIDs are not equal");
                    assert.equal(commentID, returnedRow.CommentID, "CommentIDs are not equal");
                    assert.equal(priorityID, returnedRow.PriorityID, "PriorityIDs are not equal");
                    assert.equal(issueName, returnedRow.IssueName, "IssueNames are not equal");
                    assert.equal(summary, returnedRow.Summary, "Summaries are not equal");
                    assert.equal(dateCreated, returnedRow.DateCreated, "Created Dates are not equal");
                    assert.equal(lastUpdate, returnedRow.LastUpdate, "LatestUpdates are not equal");
                    assert.equal(dateResolved, returnedRow.DateResolved, "Resolved Dates are not equal");
                    assert.equal(isResolved, returnedRow.IsResolved, "IsResolveds are not equal");
                    assert.equal(isDeleted, returnedRow.IsDeleted, "IsDeleteds are not equal");
        });
    });

    // UNIT TEST 2

});
