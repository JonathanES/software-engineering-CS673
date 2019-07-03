class CommentModel {
    constructor(CommentID, IssueID, TaskID, CreatedBy, DateCreated, Message) {
      this.CommentID = CommentID;
      this.IssueID = IssueID;
      this.TaskID = TaskID;
      this.CreatedBy = CreatedBy;
      this.DateCreated = DateCreated;
      this.TaskInfo = TaskInfo;
      this.Priority = Priority;
      this.Message = Message;
    }

    get getCommentID() {
      return this.CommentID;
    }

    get getIssueID() {
        return this.IssueID;
      }

      get getTaskID() {
        return this.TaskID;
      }

      get getCreatedBy() {
        return this.CreatedBy;
      }


      get getDateCreated() {
        return this.DateCreated;
      }
      get getMessage() {
        return this.Message;
      }
 
  }
  
  module.exports = CommentModel