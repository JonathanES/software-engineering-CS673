//// REQUIREMENTS ////
// Require the client class file
const client = require("../config/database");

//// GLOBALS ////
const Issues = [];

//// ASYNC CALLABLE FUNCTIONS ////
// Method to create a new Issue
async function createNewIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, commentID, priorityID) {
    return new Promise(async (resolve, reject) => {
        client.query("INSERT INTO Issues(ProjectID, IssueStatusID, AssigneeID, AssignedToID, CommentID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
                     [projectID, issueStatusID, userID, responsibleUserID, commentID, priorityID, issueName, issueSummary, dateCreated, lastUpdate, dateResolved, isResolved],
                      async (error, results, fields) => {
                          if(error) throw error;
                          resolve(results.insertId);
        });
    })
}

// Method to update an Issue's Status to a new Status
async function updateIssueStatus(issueID, newStatusID){
    return new Promise(async (resolve, reject) => {
      client.query("UPDATE Issues SET IssueStatusID = ? WHERE IssueID = ?",
                   [newStatusID, issueID],
                   async (error, results, fields) =>{
                      if(error) throw error;
                      resolve(results.changedRows) // Return number of changed rows, should be 1
                   })
    })
}

// Empty & Populate Issues Array and return Issues from MySQL database
async function getIssues(){
    return new Promise(async (resolve, reject) => {
        client.query("SELECT * FROM Issues", async (error, results, fields) => {
          if(error) throw error;
          Issues.length = 0; // Erase Issues Array
          results.forEach(issue => {
              Issues.push(issue);
          })
          resolve(results);
        })
    })
}

// Method to create a new IssueStatus
async function createNewIssueStatus(status){
    return new Promise(async (resolve, reject) => {
        client.query("INSERT INTO IssueStatus(Status) VALUES(?)", [status], async (error, results, fields) => {
            if(error) throw error;
        })
    })
}

module.exports = {
  createNewIssue: createNewIssue,
  updateIssueStatus: updateIssueStatus,
  getIssues: getIssues,
  createNewIssueStatus: createNewIssueStatus
}
