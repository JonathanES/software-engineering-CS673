class IssueStatusModel {
  constructor(issueStatusID, status){
    this.issueStatusID = issueStatusID;
    this.status = status;
  }

  get getIssueStatusID() {
    return this.issueStatusID;
  }

  get getStatus() {
    return this.status;
  }
}
