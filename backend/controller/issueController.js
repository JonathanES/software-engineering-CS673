//// REQUIREMENTS ////
// Require the client class file
const client = require("../config/database");
const moment = require("moment")

//// GLOBALS ////
const Issues = [];

//// ASYNC CALLABLE FUNCTIONS ////

// Method to create a new Issue
/**
 * This function creates a new Issue in the database
 * @param {string} issueName Any name
 * @param {string} issueSummary Any summary
 * @param {number} projectID A projectID number
 * @param {number} issueStatusID An issueStatusID number
 * @param {number} userID A userID number
 * @param {number} responsibleUserID A userID number who is responible for the Issue
 * @param {number} priorityID A priorityID number to give a priority to the Issue
 * @returns {number} Inserted Row's Primary Key
 */
async function createNewIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID) {
    return new Promise(async (resolve, reject) => {
        const dateCreated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const lastUpdate = dateCreated;
        const dateResolved = null;
        const isResolved = false;
        client.query("INSERT INTO Issues(ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                     [projectID, issueStatusID, userID, responsibleUserID, priorityID, issueName, issueSummary, dateCreated, lastUpdate, dateResolved, isResolved],
                      async (error, results, fields) => {
                          if(error) throw error;
                          resolve(results.insertId);
        });
    });
};

// Method to update an Issue's Status to a new Status
async function updateIssueStatus(issueID, newStatusID){
    return new Promise(async (resolve, reject) => {
      client.query("UPDATE Issues SET IssueStatusID = ? WHERE IssueID = ?",
                   [newStatusID, issueID],
                   async (error, results, fields) =>{
                      if(error) throw error;
                      resolve(results.changedRows) // Return number of changed rows, should be 1
                  });
    });
};

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
      });
  });
};

// Get and return a particular row in the issue table from ID (PK)
async function getIssueWithID(issueID){
    return new Promise(async (resolve, reject) => {
            client.query("SELECT * FROM Issues WHERE IssueID = ?", [issueID], async (error, results, fields) => {
                if(error) throw error;
                resolve(results[0]);
            });
    });
};

// Method to create a new IssueStatus
async function createNewIssueStatus(status){
    return new Promise(async (resolve, reject) => {
        client.query("INSERT INTO IssueStatus(Status) VALUES(?)", [status], async (error, results, fields) => {
            if(error) throw error;
        });
    });
};

module.exports = {
  createNewIssue: createNewIssue,
  updateIssueStatus: updateIssueStatus,
  getIssues: getIssues,
  getIssueWithID: getIssueWithID,
  createNewIssueStatus: createNewIssueStatus
};
