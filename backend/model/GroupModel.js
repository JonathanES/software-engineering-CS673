class GroupMessageModel {
    constructor(groupId, groupName) {
        this.groupId = groupId;
        this.groupName = groupName,
        this.listOfUsers = [];
        this.listOfGroupMessage = []
    }
    get getGroupId() {
        return this.groupId;
    }
    get getGroupName() {
        return this.groupName;
    }

    get getListOfGroupMessage() {
        return this.listOfGroupMessage;
    }

    get getListOfUsers(){
        return this.listOfUsers;
    }

    set setListOfGroupMessage(listOfGroupMessage) {
        this.listOfGroupMessage = listOfGroupMessage;
    }

    set setListOfUsers(listOfUsers){
        this.listOfUsers = listOfUsers;
    }


}

module.exports = GroupMessageModel