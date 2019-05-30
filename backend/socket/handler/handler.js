module.exports = function (io) {
    require('./managers/userManager')(io);
}