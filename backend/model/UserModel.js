class UserModel {
    constructor(userId, username, email, accountStatus) {
      this.userId = userId;
      this.username = username;
      this.email = email;
      this.accountStatus = this.accountStatus;
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

    get getAccountStatus(){
      return this.accountStatus;
    }
  }
  
  module.exports = UserModel