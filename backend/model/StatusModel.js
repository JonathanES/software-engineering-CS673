class StatusModel {
    constructor(StatusID, Status) {
      this.StatusID = StatusID;
      this.Status = Status;
    }

    get getStatusID() {
      return this.StatusID;
    }

    get getStatus() {
        return this.Status;
      }

  }
  
  module.exports = StatusModel