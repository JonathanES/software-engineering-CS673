class IssueModel {
  constructor(issueID, projectID, issueStatusID, assigneeID, assignedToID, commentID, priorityID, description, summary, dateCreated, lastUpdate, dateResolved, isResolved){
    this.issueID = issueID;
    this.projectID = projectID;
    this.issueStatusID = issueStatusID;
    this.assigneeID = assigneeID;
    this.assignedToID = assignedToID;
    this.commentID = commentID;
    this.priorityID = priorityID;
    this.description = description;
    this.summary = summary;
    this.dateCreated = dateCreated;
    this.lastUpdate = lastUpdate;
    this.dateResolved = dateResolved;
    this.isResolved = isResolved;
  }

  get getIssueID() {
    return this.issueID;
  }

  get getProjectID() {
    return this.projectID;
  }

  get getIssueStatusID() {
    return this.issueStatusID;
  }

  get getAssigneeID() {
    return this.assigneeID;
  }

  get getAssignedToID() {
    return this.assignedToID;
  }

  get getCommentID() {
    return this.commentID;
  }

  get getPriorityID() {
    return this.priorityID;
  }

  get getDescription() {
    return this.description;
  }

  get getSummary() {
    return this.summary;
  }

  get getDateCreated() {
    return this.dateCreated;
  }

  get getLastUpdate() {
    return this.lastUpdate
  }

  get getDateResolved() {
    return this.dateResolved;
  }

  get getIsResolved() {
    return this.isResolved;
  }
}
