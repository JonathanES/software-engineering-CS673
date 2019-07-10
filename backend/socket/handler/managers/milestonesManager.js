const projectMilestonesController = require('../../../controller/projectMilestonesController');
module.exports = function (io) {
    //connect to the socket so that we can link with the frontend
    io.on('connection', client => {
        client.on('USER_CREATE_MILESTONE', async (projectID, milestoneName) => {
            const result = await projectMilestonesController.insertNewMilestone(projectID, milestoneName)
            client.emit('CREATE_MILESTONE', result);
           })

        client.on('USER_GET_MILESTONELIST', async (projectID) => {
            const result = await projectMilestonesController.getListOfMilestones(projectID)
            //client.emit('SEND_MESSAGE', result);
            client.emit('GET_MILESTONELIST', result);
        })

        client.on('USER_GET_MILESTONE', async (mileStoneID) => {
            const result = await projectMilestonesController.getMilestone(mileStoneID)
            //client.emit('SEND_MESSAGE', result);
            client.emit('GET_MILESTONE', result);
        })


        client.on('USER_UPDATE_MILESTONE_NAME', async (milestoneID, milestoneName) => {
            const result = await projectMilestonesController.updateMilestoneName(milestoneID, milestoneName)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_MILESTONE_NAME', result);
        })

        // client.on('USER_UPDATE_MILESTONE_DATE', async (milestoneID, date) => {
        //     const result = await projectMilestonesController.updateMilestoneDate(milestoneID, date)
        //     //client.emit('SEND_MESSAGE', result);
        //     client.emit('UPDATE_MILESTONE_DATE', result);
        // })

        client.on('USER_UPDATE_MILESTONE_COMPLETED', async (milestoneID, isCompleted) => {
            const result = await projectMilestonesController.updateIsCompleted(milestoneID, isCompleted)
            //client.emit('SEND_MESSAGE', result);
            client.emit('UPDATE_MILESTONE_COMPLETED', result);
        })

    })
};
