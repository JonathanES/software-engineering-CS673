class ProjectsMilestones {
  constructor(MSID, ProjectID, Name, Date, IsCompleted){
    this.MilestoneID = MilestoneID;
    this.ProjectID = ProjectID;
    this.MilestoneName = MilestoneName;
    this.Date = Date;
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
  get getDate(){
    return this.Date;
  }
  get getIsCompleted(){
    return this.IsCompleted;
  }

}
