class StatusModel {
    constructor(statusID, status) {
      this.statusID = statusID;
      this.status = status;
    }

    get getStatusID() {
      return this.statusID;
    }

    get getStatus() {
        return this.status;
      }

  }
  
  module.exports = StatusModel