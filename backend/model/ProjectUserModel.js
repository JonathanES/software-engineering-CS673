class ProjectUserModel {
    constructor(userID, projectID, accountType) {
      this.userID = userID; 
      this.projectID = projectID;
      this.accountType = accountType;
    }

    get getuserID() {
      return this.userID;
    }
  
    get getprojectID() {
      return this.projectID;
    }
  
    get getaccountType() {
      return this.accountType;
    }

  }
  
  module.exports = ProjectUserModel