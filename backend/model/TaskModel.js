class TaskModel {
  constructor(taskID, parentID, categoryID, userID, statusID, status, priorityID, priority, taskName, taskInfo, createdDate, dueDate, expectedDuration, actualTimeSpent, isDeleted, projectName, categoryName) {
    this.taskID = taskID;
    this.parentID = parentID;
    this.categoryID = categoryID;
    this.userID = userID;
    this.statusID = statusID;
    this.status = status;
    this.priorityID = priorityID;
    this.priority = priority;
    this.taskName = taskName;
    this.taskInfo = taskInfo;
    this.createdDate = createdDate;
    this.dueDate = dueDate;
    this.expectedDuration = expectedDuration;
    this.actualTimeSpent = actualTimeSpent;
    this.isDeleted = isDeleted;
    this.projectName = projectName;
    this.categoryName = categoryName;
  }

  get getTaskID() {
    return this.taskID;
  }

  get getParentID() {
    return this.parentID;
  }

  get getCategoryID() {
    return this.categoryID;
  }

  get getUserID() {
    return this.userID;
  }

  get getStatusID() {
    return this.statusID;
  }

  get getStatus() {
    return this.status;
  }

  get getPriorityID() {
    return this.priorityID;
  }

  get getPriority() {
    return this.priority;
  }

  get getTaskName() {
    return this.taskName;
  }

  get getTaskInfo() {
    return this.taskInfo;
  }


  get getCreatedDate() {
    return this.createdDate;
  }
  get getDueDate() {
    return this.dueDate;
  }

  get getExpectedDuration() {
    return this.expectedDuration;
  }

  get getActualTimeSpent() {
    return this.actualTimeSpent;
  }

  get getIsDeleted() {
    return this.isDeleted;
  }

  get getProjectName() {
    return this.projectName;
  }

  get getCategoryName() {
    return this.categoryName;
  }

  set setStatusID(statusID) {
    this.statusID = statusID;
  }

  set setStatus(status) {
    this.status = status;
  }

  set setTaskName(taskName) {
    this.taskName = taskName;
  }
  set setPriorityID(priorityID) {
    this.priorityID = priorityID;
  }

  set setPriority(priority) {
    this.priority = priority;
  }

  set setTaskInfo(taskInfo) {
    this.taskInfo = taskInfo;
  }

  set setExpectedDuration(expectedDuration) {
    this.expectedDuration = expectedDuration;
  }

  set setActualTimeSpent(actualTimeSpent) {
    this.actualTimeSpent = actualTimeSpent;
  }

  set setIsDeleted(isDeleted) {
    this.isDeleted = isDeleted;
  }

  set setDueDate(dueDate) {
    this.dueDate = dueDate;
  }
}

module.exports = TaskModel