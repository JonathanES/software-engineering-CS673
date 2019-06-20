class Chatroom {
    constructor(userId, username, email) {
      this.userId = userId;
      this.username = username;
      this.email = email;
    }
    get getUsername() {
      return this.username;
    }
  
    get getUserId() {
      return this.userId;
    }
  
    get getEmail() {
      return this.email;
    }
  }
  
  module.exports = Chatroom