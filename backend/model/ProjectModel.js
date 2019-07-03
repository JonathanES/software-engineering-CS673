class ProjectModel {
  constructor(projectID, projectName, dateCreated, dueDate, isDeleted) {
    this.projectID = projectID;
    this.projectName = projectName;
    this.dateCreated = dateCreated;
    this.dueDate = dueDate;
    this.isDeleted = isDeleted;
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

}

module.exports = ProjectModel