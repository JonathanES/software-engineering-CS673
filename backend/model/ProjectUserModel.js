class ProjectUserModel {
    constructor(userID, projectID, accountType) {
      this.userID = userID; 
      this.projectID = projectID;
      this.accountType = accountType;
    }

    get getUserID() {
      return this.userID;
    }
  
    get getProjectID() {
      return this.projectID;
    }
  
    get getAccountType() {
      return this.accountType;
    }

  }
  
  module.exports = ProjectUserModel