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

async function deleteIssue(issueID){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET IsDeleted = 1 WHERE IssueID = ?",
                    [issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function hardDeleteIssue(issueID){
    return new Promise(async (resolve, reject) => {
        client.query("DELETE FROM Issues WHERE IssueID = ?",
        [issueID],
        async (error, results, fields) => {
            if (error) throw error;
            resolve(results.changedRows);
        });
    })
}

// Empty & Populate Issues Array and return Issues from MySQL database
/**
 * This function returns all the Issues in the DB in an array
 * @returns {array} Returns an array with all the Row objects in the Issues table
 */
async function getIssues(){
    return new Promise(async (resolve, reject) => {
        // client.query("SELECT * FROM Issues WHERE (IssueID > 1) AND (IsDeleted = 0)", async (error, results, fields) => {
        client.query("SELECT I.IssueID, I.ProjectID, I.IssueStatusID, I.AssigneeID, I.AssignedToID, I.PriorityID, I.IssueName, I.Summary, I.DateCreated, I.LastUpdate, I.DateResolved, I.IsResolved, I.IsDeleted, U.username as AssigneeUsername, Us.username as AssignedToUsername, P.ProjectID, P.ProjectName FROM Issues I Join Users U on U.UserID = I.AssigneeID Join Users Us on Us.UserID = I.AssignedToID Join Projects P on P.ProjectID = I.ProjectID WHERE (I.IssueID > 1) AND (I.IsDeleted = 0)", async (error, results, fields) => {
          if(error) throw error;
          Issues.length = 0; // Erase Issues Array
          results.forEach(issue => {
              Issues.push(issue);
          })
          resolve(results);
      });
  });
};

async function createCommentForIssue(issueID, creatorID, commentText){
    return new Promise(async (resolve, reject) => {
        const dateCreated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        client.query("INSERT INTO Comments(IssueID, TaskID, CreatedBy, DateCreated, Message, IsDeleted) VALUES(?,?,?,?,?,?)",
                    [issueID, 1, creatorID, dateCreated, commentText, 0],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.insertId); // Return the ID of the inserted comment for reference
                    }
    );
    });
};

async function getCommentsForIssue(issueID){
    return new Promise(async (resolve, reject) => {
        client.query("SELECT * FROM Comments WHERE IssueID = ?", [issueID],
            async (error, results, fields) => {
                if (error) throw error;
                resolve(results); // Return comments in an array
        });
    });
};

// Get and return a particular row in the issue table from ID (PK)
/**
 * This function gets a specific Issue from the DB
 * @param {number} issueID The ID of the Issue you are interested in
 * @returns {object} Returns the row object of the IssueID specified
 */
async function getIssueWithID(issueID){
    return new Promise(async (resolve, reject) => {
            client.query("SELECT * FROM Issues WHERE IssueID = ?", [issueID], async (error, results, fields) => {
                if(error) throw error;
                resolve(results[0]);
            });
    });
};

// Method to create a new IssueStatus
/**
 * This function generates a new IssueStatus type in the DB
 * @param {string} status The name of the status you want to be created in the database
 */
async function createNewIssueStatus(status){
    return new Promise(async (resolve, reject) => {
        client.query("INSERT INTO IssueStatus(Status) VALUES(?)", [status], async (error, results, fields) => {
            if(error) throw error;
        });
    });
};

async function updateProjectID(issueID, projectID){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET ProjectID = ? WHERE IssueID = ?", [projectID, issueID],
        async (error, results, fields) => {
            if (error) throw error;
            resolve(results.changedRows);
        }
        );
    });
};

// Method to update an Issue's Status to a new Status
/**
 * This function updates an Issue's status in the database
 * @param {number} issueID The ID of the Issue whose status you want to update
 * @param {number} newStatusID An issueStatusID number to set the new issueStatus of the Issue
 * @returns {number} Returns the count/number of changed rows in the database
 */
async function updateIssueStatus(issueID, newStatusID){
    return new Promise(async (resolve, reject) => {
      client.query("UPDATE Issues SET IssueStatusID = ? WHERE IssueID = ?",
                   [newStatusID, issueID],
                   async (error, results, fields) =>{
                      if(error) throw error;
                      resolve(results.changedRows); // Return number of changed rows, should be 1
                  });
    });
};

async function updateAssigneeID(issueID, assigneeID){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET AssigneeID = ? WHERE IssueID = ?", [assigneeID, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function updateAssignedToID(issueID, assignedToID){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET AssignedToID = ? WHERE IssueID = ?", [assignedToID, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function updatePriorityID(issueID, priorityID){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET PriorityID = ? WHERE IssueID = ?", [priorityID, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function updateIssueName(issueID, issueName){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET IssueName = ? WHERE IssueID = ?", [issueName, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function updateIssueSummary(issueID, issueSummary){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET Summary = ? WHERE IssueID = ?", [issueSummary, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function updateLastUpdate(issueID, lastUpdate){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET LastUpdate = ? WHERE IssueID = ?", [lastUpdate, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.affectedRows); // Changed from changedRows to affectedRows (maybe if you call it too quickly it wont change the date?)
                    });
    });
};

async function updateDateResolved(issueID, dateResolved){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET DateResolved = ? WHERE IssueID = ?", [dateResolved, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

async function updateIsResolved(issueID, isResolved){
    return new Promise(async (resolve, reject) => {
        client.query("UPDATE Issues SET IsResolved = ? WHERE IssueID = ?", [isResolved, issueID],
                    async (error, results, fields) => {
                        if (error) throw error;
                        resolve(results.changedRows);
                    });
    });
};

module.exports = {
  createNewIssue: createNewIssue,
  deleteIssue: deleteIssue,
  hardDeleteIssue: hardDeleteIssue,
  getIssues: getIssues,
  createCommentForIssue: createCommentForIssue,
  getCommentsForIssue: getCommentsForIssue,
  getIssueWithID: getIssueWithID,
  createNewIssueStatus: createNewIssueStatus,
  updateProjectID: updateProjectID,
  updateIssueStatus: updateIssueStatus,
  updateAssigneeID: updateAssigneeID,
  updateAssignedToID: updateAssignedToID,
  updatePriorityID: updatePriorityID,
  updateIssueName: updateIssueName,
  updateIssueSummary: updateIssueSummary,
  updateLastUpdate: updateLastUpdate,
  updateDateResolved: updateDateResolved,
  updateIsResolved: updateIsResolved
};
