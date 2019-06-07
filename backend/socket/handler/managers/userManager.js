const userController = require('../../../controller/userController');
module.exports = function (io) {
    const history = [];
    /**
     * socket section that is about the user
     * Which means the link between the frontend and the backend for the user
     */
    io.on('connection', client => {
        client.on('USER_LOGIN', async (email, password) => {
            const result = await userController.getSingleUser(email, password);
            console.log(result.username + " is connected");
            client.emit('LOGIN', result);
        });

        client.on('USER_REGISTER', async (username, email, password) => {
            const result = await userController.insertUser(email, username, password);
            client.emit('REGISTER', result);
        });

        client.on('USER_SEND_MESSAGE', async (username, message) => {
            history.push({username: username, message: message});
            client.broadcast.emit('SEND_MESSAGE', history);
        })

        client.on('USER_GET_MESSAGE', async () => {
            client.broadcast.emit('SEND_MESSAGE', history);
        })
    })
};