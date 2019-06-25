
const projectController = require('../../../controller/projectController');
module.exports = function (io) {
    //connect to the socket so that we can link with the frontend
    io.on('connection', client => { 
        client.on('USER_CREATE_PROJECT', async (userID, projectName, dueDate ) => {
            const result = await projectController.insertNewProject(userID,prjectName,dueDate)
            client.emit('CREATE_PROJECT', result);
           })

        client.on('USER_GET_PROJECTLIST', async (userID) => {
            const result = await projectController.getListofProjects(userID)
            //client.emit('SEND_MESSAGE', result);
            client.emit('GET_PROJECTLIST', result);
        })
    })
};
