class DirectMessageModel {
    constructor(senderId, receiverId, senderName, receiverName) {
        this.senderId = senderId;
        this.receiverId = receiverId,
        this.senderName = senderName,
        this.receiverName = receiverName,
        this.chatHistory = []
    }
    get getReceiverName() {
        return this.receiverName;
    }
    get getSenderName() {
        return this.senderName;
    }

    get getReceiverId() {
        return this.receiverId;
    }

    get getSenderId() {
        return this.senderId;
    }

    get getChatHistory() {
        return this.chatHistory;
    }

    set setChatHistory(chatHistory) {
        this.chatHistory = chatHistory;
    }


}

module.exports = DirectMessageModel