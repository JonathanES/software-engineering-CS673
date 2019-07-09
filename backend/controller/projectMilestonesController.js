//constant allows for connection to the database and access to the queries required
const client = require('../config/database');

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

 async function insertNewMilestone(projectID, milestoneID, milestoneName, date, isCompleted) {
     return new Promise(async resolve => {
         client.query('INSERT INTO ProjectsMilestones(ProjectID, MilestoneID, MilestoneName, Date) VALUES(?,?,?,NOW())', [projectID, milestoneID, milestoneName, date], async function (error, results, fields) {
             if (error) throw error;
             const milestones = await getListOfMilestones(projectID);
             resolve(milestones);
         });
     })
 }
 function getListOfMilestones(projectID){
     return new Promise((resolve, reject) => {
        client.query('SELECT * FROM ProjectsMilestones WHERE ProjectID = ?', [projectID], function (error, milestones, fields) {
            milestones.forEach(milestone => {
                if (!listOfMilestones.some(elt => elt.getMilestoneID == milestones.MilestoneID)){
                    const milestonesModel = new ProjectsMilestones(elt.MilestoneID, elt.ProjectID, elt.MilestoneName,elt.Date,elt.IsCompleted);
                    listOfMilestones.push(milestonesModel);
                }
            })
            if (error) throw error;
            resolve(milestones);
        });
     })
    }
 async function updateMilestoneName(milestoneID, milestoneName) {
     return new Promise(async resolve => {
         client.query('UPDATE ProjectsMilestones SET  MilestoneName = ?  WHERE MilestoneID = ?; ', [milestoneName,milestoneID], async function (error, results, fields) {
             if (error) throw error;
             console.log("updateMilestoneName function called");
             resolve(milestoneName);
         });
     })
 }
 async function updateMilestoneDate(milestoneID, date) {
     return new Promise(async resolve => {
         client.query('UPDATE ProjectsMilestones SET  MilestoneDate = ?  WHERE MilestoneID = ?; ', [milestoneDate,milestoneID], async function (error, results, fields) {
             if (error) throw error;
             console.log("updateMilestoneDate function called");
             resolve(milestoneDate);
         });
     })
 }
 async function updateIsCompleted(milestoneID, isCompleted){
   return new Promise(async resolve => {
     client.query('UPDATE ProjectsMilestones SET  IsCompleted = ?  WHERE MilestoneID = ?; ', [isCompleted,milestoneID], async function (error, results, fields) {
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
   updateMilestoneDate: updateMilestoneDate,
   updateIsComplete: updateIsComplete
 }
