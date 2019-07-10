class CommentModel {
  constructor(commentID, issueID, taskID, createdBy, dateCreated, message, isDeleted) {
    this.commentID = commentID;
    this.issueID = issueID;
    this.taskID = taskID;
    this.createdBy = createdBy;
    this.dateCreated = dateCreated;
    this.message = message;
    this.isDeleted = isDeleted
  }

  get getCommentID() {
    return this.commentID;
  }

  get getIssueID() {
    return this.issueID;
  }

  get getTaskID() {
    return this.taskID;
  }

  get getCreatedBy() {
    return this.createdBy;
  }

  get getDateCreated() {
    return this.dateCreated;
  }
  get getMessage() {
    return this.message;
  }

  get getIsDeleted() {
    return this.isDeleted;
  }

}

module.exports = CommentModel