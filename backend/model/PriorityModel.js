class PriorityModel {
    constructor(priorityID, priority) {
      this.priorityID = priorityID;
      this.priority = priority;
    }

    get getpriorityID() {
      return this.priorityID;
    }

    get getpriority() {
        return this.priority;
      }

  }
  
  module.exports = PriorityModel