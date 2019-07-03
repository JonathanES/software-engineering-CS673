class StatusModel {
    constructor(statusID, statusName) {
      this.statusID = statusID;
      this.statusName = statusName;
    }

    get getStatusID() {
      return this.statusID;
    }

    get getStatusName() {
        return this.statusName;
      }

  }
  
  module.exports = StatusModel