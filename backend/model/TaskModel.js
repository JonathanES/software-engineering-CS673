class TaskModel {
    constructor(taskID, taskName, parentID,categoryID,userID,taskInfo,priorityID,createdDate,expecedDuration,actualTimeSpent, statusID) {
      this.taskID = taskID;
      this.taskName = taskName;
      this.parentID = parentID;
      this.categoryID = categoryID;
      this.userID = userID;
      this.taskInfo = taskInfo;
      this.priorityID = priorityID;
      this.createdDate = createdDate;
      this.expecedDuration = expecedDuration;
      this.actualTimeSpent = actualTimeSpent;
      this.statusID = statusID;
    }

    get getTaskID() {
      return this.taskID;
    }
  
    get getTaskName() {
      return this.taskName;
    }
  
    get getparentID() {
      return this.parentID;
    }

    get getcategoryID() {
        return this.categoryID;
      }

    get getUserID() {
        return this.userID;
      }

      get getTaskInfo() {
        return this.taskInfo;
      }
      get getPriority() {
        return this.priority;
      }

      get getCreatedDate() {
        return this.createdDate;
      }

      get getExpectedDuration() {
        return this.expecedDuration;
      }

      get getActualTimeSpent() {
        return this.actualTimeSpent;
      }

      get getStatusID() {
        return this.statusID;
      }

  }
  
  module.exports = TaskModel