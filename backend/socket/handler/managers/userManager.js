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
            client.join(result.userId);
            client.emit('LOGIN', result);
        });
        /**
         * when the frontend sends a USER_REGISTER request
         *  1) call the insertUser function from the usercontroller
         *  2) send to the frontend (client.emit) the information that has been retrieved by the controller.
         * */
        client.on('USER_REGISTER', async (username, email, password) => {
            const result = await userController.insertUser(email, username, password);
            client.join(result.userId);
            client.emit('REGISTER', result);
        });

        client.on('USER_FRIENDS', async (user_id) => {
            const result = await userController.getListofUsers(user_id);
            client.emit('FRIENDS', result);

        })

        client.on('USER_PASSWORD_FORGOTTEN', async(email) => {
            await userController.passwordForgotten(email);
        })

        client.on("USER_UPDATE_PASSWORD",async (email, password)=> {
            const result = await userController.updatePassword(email, password);
            client.emit("UPDATE_PASSWORD", result);
        })

    })
};

