class GroupMessageModel {
    constructor(userId, groupId, message, date){
        this.userId = userId;
        this.groupId = groupId;
        this.message = message;
        this.date = date;

    }
    get getUserId() {
        return this.userId;
    }
    get getGroupId() {
        return this.groupId;
    }

    get getMessage() {
        return this.message;
    }

    get getDate() {
        return this.date;
    }


}

module.exports = GroupMessageModel