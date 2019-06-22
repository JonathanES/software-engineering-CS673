/**
 * socket section that is about the user
 * it is the link between the frontend and the backend for the user
 */

 //retrieve the functions that has been exported in the userController
const userController = require('../../../controller/userController');
module.exports = function (io) {
    const history = [];
    //connect to the socket so that we can link with the frontend
    io.on('connection', client => {
        /**
         * when the frontend sends a USER_LOGIN request
         *  1) call the getSinglerUser function from the usercontroller
         *  2) send to the frontend (client.emit) the information that has been retrieved by the controller.
         * */
        client.on('USER_LOGIN', async (email, password) => {
            const result = await userController.getSingleUser(email, password);
            console.log(result.username + " is connected");
            client.emit('LOGIN', result);
        });
        /**
         * when the frontend sends a USER_REGISTER request
         *  1) call the insertUser function from the usercontroller
         *  2) send to the frontend (client.emit) the information that has been retrieved by the controller.
         * */
        client.on('USER_REGISTER', async (username, email, password) => {
            const result = await userController.insertUser(email, username, password);
            client.emit('REGISTER', result);
        });

        client.on('USER_FRIENDS', async(user_id) => {
            const result = await userController.getListofUsers(user_id);
            client.emit('FRIENDS', result);
        })
        
        client.on('USER_SEND_MESSAGE', async (username, message) => {
            history.push({ username: username, message: message });
            client.broadcast.emit('SEND_MESSAGE', history);
        })

        client.on('USER_GET_MESSAGE', async () => {
            client.broadcast.emit('SEND_MESSAGE', history);
        })
    })
};