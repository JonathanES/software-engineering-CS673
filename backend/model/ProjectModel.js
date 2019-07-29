class ProjectModel {
  constructor(projectID, projectName, userID, dateCreated, dueDate, isDeleted) {
    this.projectID = projectID;
    this.projectName = projectName;
    this.dateCreated = dateCreated;
    this.dueDate = dueDate;
    this.isDeleted = isDeleted;
    this.userID = userID;
  }

  get getUserID() {
    return this.userID;
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

  get getIsDeleted() {
    return this.isDeleted;
  }

  set setIsDeleted(isDeleted) {
    this.isDeleted = isDeleted;
}

}

module.exports = ProjectModel