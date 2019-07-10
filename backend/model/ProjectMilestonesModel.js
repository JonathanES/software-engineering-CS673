class ProjectsMilestones {
  constructor(MilestoneID, ProjectID, MilestoneName, DateCreated, DueDate, IsCompleted){
    this.MilestoneID = MilestoneID;
    this.ProjectID = ProjectID;
    this.MilestoneName = MilestoneName;
    this.DateCreated = DateCreated;
    this.DueDate = DueDate;
    this.IsCompleted = IsCompleted;
    }
  get getMilestoneID(){
    return this.MilestoneID;
  }
  get getProjectID(){
    return this.ProjectID;
  }
  get getMilestoneName(){
    return this.MilestoneName;
  }
  get getDateCreated(){
    return this.DateCreated;
  }
  get getDueDate(){
    return this.DueDate;
  }
  get getIsCompleted(){
    return this.IsCompleted;
  }

}
module.exports = ProjectsMilestones