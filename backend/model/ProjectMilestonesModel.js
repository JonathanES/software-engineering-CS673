class ProjectsMilestones {
  constructor(MilestoneID, ProjectID, MilestoneName, DateCreated, IsCompleted){
    this.MilestoneID = MilestoneID;
    this.ProjectID = ProjectID;
    this.MilestoneName = MilestoneName;
    this.DateCreated = DateCreated;
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
  get getIsCompleted(){
    return this.IsCompleted;
  }

}
module.exports = ProjectsMilestones