//constant allows for connection to the database and access to the queries required
const client = require('../config/database');
const ProjectMilestonesModel = require('../model/ProjectMilestonesModel');

/**
 *
 * @param {*} milestoneID
 * @param {*} projectID
 * @param {*} milestoneName
 * @param {*} date
 * @param {*} isCompleted
 * I insert the milestone into the database
 * then I return the chat history to the frontend
 */
 const listOfMilestones = [];

 async function insertNewMilestone(projectID, milestoneName) {
     return new Promise(async resolve => {
         client.query('INSERT INTO ProjectMileStones(ProjectID, MilestoneName, DateCreated) VALUES(?,?,NOW())', [projectID, milestoneName], async function (error, results, fields) {
             if (error) throw error;
             const milestones = await getListOfMilestones(projectID);
             resolve(results);
         });
     })
 }

 function getMilestone(mileStoneID){
     return new Promise((resolve, reject)=>{
         console.log('mileStoneID:', mileStoneID);
         client.query('Select * FROM ProjectMileStones WHERE MilestonesID = ?', [mileStoneID], function(error, result,fields){
             if(error) throw error;
             resolve(result);
         })
     })
 }

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

async function updateMilestoneName(milestoneID, milestoneName) {
    return new Promise(async resolve => {
        client.query('UPDATE ProjectMileStones SET  MilestoneName = ?  WHERE MilestonesID = ?; ', [milestoneName, milestoneID], async function (error, results, fields) {
            if (error) throw error;
            console.log("updateMilestoneName function called");
            resolve(milestoneName);
        });
    })
}

//  async function updateMilestoneDate(milestoneID, DateCreated) {
//      return new Promise(async resolve => {
//          client.query('UPDATE ProjectMileStones SET  MilestoneDate = ?  WHERE MilestonesID = ?; ', [milestoneDate,milestonesID], async function (error, results, fields) {
//              if (error) throw error;
//              console.log("updateMilestoneDate function called");
//              resolve(milestoneDate);
//          });
//      })
//  }


 async function updateIsCompleted(milestoneID, isCompleted){
   return new Promise(async resolve => {
     client.query('UPDATE ProjectMileStones SET  IsCompleted = ?  WHERE MilestonesID = ?; ', [isCompleted,milestoneID], async function (error, results, fields) {
       if (error) throw error;
       console.log("updateIsCompleted function called");
       resolve(isCompleted);
     });
   })
 }

 module.exports = {
   insertNewMilestone: insertNewMilestone,
   getListOfMilestones: getListOfMilestones,
   updateMilestoneName: updateMilestoneName,
   getMilestone: getMilestone,
   //updateMilestoneDate: updateMilestoneDate,
   updateIsCompleted: updateIsCompleted
 }
