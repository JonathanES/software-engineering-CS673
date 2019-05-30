module.exports = function (io) {
    /**
 * instantiation of socket.io
 */
    io.on('connection', client => {

        client.on('USER_SEND_MESSAGE', async (message) => {
            client.broadcast.emit('SEND_MESSAGE', result);
        })
    })
};