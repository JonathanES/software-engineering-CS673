class TaskModel {
    constructor(TaskID, TaskName, parentID,CategoryID,UserID,TaskInfo,Priority,CreatedDate,ExpecedDuration,ActualTimeSpent, StatusID) {
      this.TaskID = TaskID;
      this.TaskName = TaskName;
      this.parentID = parentID;
      this.CategoryID = CategoryID;
      this.UserID = UserID;
      this.TaskInfo = TaskInfo;
      this.Priority = Priority;
      this.CreatedDate = CreatedDate;
      this.ExpecedDuration = ExpecedDuration;
      this.ActualTimeSpent = ActualTimeSpent;
      this.StatusID = StatusID;
    }

    get getTaskID() {
      return this.TaskID;
    }
  
    get getTaskName() {
      return this.TaskName;
    }
  
    get getparentID() {
      return this.parentID;
    }

    get getcategoryID() {
        return this.CategoryID;
      }

    get getUserID() {
        return this.UserID;
      }

      get getTaskInfo() {
        return this.TaskInfo;
      }
      get getPriority() {
        return this.Priority;
      }

      get getCreatedDate() {
        return this.CreatedDate;
      }

      get getExpectedDuration() {
        return this.ExpecedDuration;
      }

      get getActualTimeSpent() {
        return this.ActualTimeSpent;
      }

      get getStatusID() {
        return this.StatusID;
      }

  }
  
  module.exports = TaskModel