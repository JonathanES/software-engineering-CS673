//// REQUIREMENTS ////
// Connect to the database
const client = require('../config/database');
// Require class file
const ProjectMilestonesModel = require('../model/ProjectMilestonesModel');

 //// GLOBAL CONSTANTS ////
 const listOfMilestones = [];

//// ASYNC CALLABLE FUNCTIONS ////

//Method to create a new Milestone
/**
 * This function creates a new Milestone in the database
 *
 * @param {number} mileStoneID Milestone ID number
 * @param {number} projectID Project ID number
 * @param {string} milestoneName The name of the milestone
 * @param {number} dueDate Due date of the milestone
 *
 *
 */
 async function insertNewMilestone(projectID, milestoneName,dueDate) {
     return new Promise(async resolve => {
         client.query('INSERT INTO ProjectMileStones(ProjectID, MilestoneName, DateCreated, DueDate) VALUES(?,?,NOW(),?)', [projectID, milestoneName,dueDate], async function (error, results, fields) {
             if (error) throw error;
             const milestones = await getListOfMilestones(projectID);
             resolve(results);
         });
     })
 }
 // Get a milestone given the milestone's ID (PK)
/**
 *
 * This function returns a specific milestone given the MilestoneID
 * @param {number} mileStoneID The ID of the milestone you wish to retrieve from the DB
 * @returns {object} Returns the Milestone based on the ID provided
 *
 */
 function getMilestone(mileStoneID){
     return new Promise((resolve, reject)=>{
         //console.log('mileStoneID:', mileStoneID);
         client.query('Select * FROM ProjectMileStones WHERE MilestonesID = ?', [mileStoneID], function(error,result,fields){
             if(error) throw error;
             resolve(result);
         })
     })
 }
//Method to get an array of the milestones attached to a project
/**
 *
 * This function returns an array of the milestones attached to a given project
 * @param {number} projectID The ID of the project from which you wish to pull the milestones
 * @returns {array} Returns an array containing a list of the milestones for the specified project
 *
 */
function getListOfMilestones(projectID) {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM ProjectMileStones WHERE ProjectID = ?', [projectID], function (error, results, fields) {
            //console.log(results);
            results.forEach(result => {
                if (!listOfMilestones.some(elt => elt.getMilestoneID == result.MilestonesID)) {
                    const elt = new ProjectMilestonesModel(result.MilestonesID, result.ProjectID, result.MilestoneName, result.DateCreated, result.IsCompleted);
                    listOfMilestones.push(elt);
                }
            })
            if (error) throw error;
            resolve(results);
        });
    })
}
// Method to update the name of a milestone
/**
 *
 * This function returns
 * @param {number} projectID The ID of the project from which you wish to pull the milestones
 * @returns {array} Returns an array containing a list of the milestones for the specified project
 *
 */
async function updateMilestoneName(milestoneID, milestoneName) {
    return new Promise(async resolve => {
        client.query('UPDATE ProjectMileStones SET  MilestoneName = ?  WHERE MilestonesID = ?; ', [milestoneName, milestoneID], async function (error, results, fields) {
            if (error) throw error;
            //console.log("updateMilestoneName function called");
            resolve(milestoneName);
        });
    })
}
// Method to update the due date of the milestone
/**
 *
 * This function updates the due date of a specified milestone in the DB
 * @param {number} milestoneID The ID of the milestone for which you wish to change the date
 * @param {number} dueDate The new due date of the milestone
 * @returns {number} Returns the new due date
 */

 async function updateMilestoneDueDate(milestoneID, dueDate) {
     return new Promise(async resolve => {
         client.query('UPDATE ProjectMileStones SET  DueDate = ?  WHERE MilestonesID = ?; ', [dueDate,milestoneID], async function (error, results, fields) {
             if (error) throw error;
             //console.log("updateMilestoneDate function called");
             resolve(dueDate);
         });
     })
 }

// Method to update the completion status of a milestone
/**
 *
 * This function updates the completion status of a specified milestone in the DB
 * @param {number} milestoneID The ID of the milestone for which you wish to change the completion status
 * @param {boolean} isCompleted The new due date of the milestone
 * @returns {boolean} Returns the new completion status
 */

 async function updateIsCompleted(milestoneID, isCompleted){
   return new Promise(async resolve => {
     client.query('UPDATE ProjectMileStones SET  IsCompleted = ?  WHERE MilestonesID = ?; ', [isCompleted,milestoneID], async function (error, results, fields) {
       if (error) throw error;
       //console.log("updateIsCompleted function called");
       resolve(isCompleted);
     });
   })
 }

 module.exports = {
   insertNewMilestone: insertNewMilestone,
   getListOfMilestones: getListOfMilestones,
   updateMilestoneName: updateMilestoneName,
   getMilestone: getMilestone,
   updateMilestoneDueDate: updateMilestoneDueDate,
   updateIsCompleted: updateIsCompleted
 }
