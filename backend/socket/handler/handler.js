module.exports = function (io) {
    require('./managers/userManager')(io);
    require('./managers/messagingManager')(io);
    require('./managers/taskManager')(io);
    require('./managers/projectManager')(io);
}