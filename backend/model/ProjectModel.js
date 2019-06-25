class ProjectModel {
    constructor(projectID, projectName, dateCreated, dueDate) {
      this.projectID = projectID; 
      this.projectName = projectName;
      this.dateCreated = dateCreated;
      this.dueDate = dueDate;
    }

    get getProjectID() {
      return this.projectID;
    }
  
    get getProjectName() {
      return this.projectName;
    }
  
    get getDateCreated() {
      return this.dateCreated;
    }

    get getDueDate() {
        return this.dueDate;
      }

  }
  
  module.exports = ProjectModel