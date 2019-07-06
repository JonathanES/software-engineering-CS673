INSERT INTO Priority(Priority) VALUES ('Low');
INSERT INTO Priority(Priority) VALUES ('Moderate');
INSERT INTO Priority(Priority) VALUES ('High');

INSERT INTO TaskStatus(StatusName) VALUES('Did not Start');
INSERT INTO TaskStatus(StatusName) VALUES('Working on it');
INSERT INTO TaskStatus(StatusName) VALUES('Done');

INSERT INTO AccountStatus(StatusName) VALUES('Active');
INSERT INTO AccountStatus(StatusName) VALUES('Inactive');

INSERT INTO IssueStatus(StatusName) VALUES('Did not Start');
INSERT INTO IssueStatus(StatusName) VALUES('Working on it');
INSERT INTO IssueStatus(StatusName) VALUES('Done');

INSERT INTO AccountType(TypeName) VALUES('Admin');
INSERT INTO AccountType(TypeName) VALUES('PowerUser');
INSERT INTO AccountType(TypeName) VALUES('User');

-- Default task for the database, this is assigned to Admin and will be used for Comments
-- Comments will look for if the comment is for an issue or for a task, if it sees the taskID = 0 then it should be a comment for an issue
-- similarly if the IssueID = 0 then the comment should belong to a Task
-- The following entries will not be accesible from users. It is there for space holder.
INSERT INTO Projects(ProjectName,DateCreated,DueDate) Values('N/A','2010-01-01', '2010-01-01');
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(1,1,1,1,1,'N/A','N/A','2010-01-01',1,1);
INSERT INTO Issues(ProjectID,IssueStatusID,AssigneeID,AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate) Values(0,1,1,1,1,'N/A','N/A','2010-01-01','2010-01-01');

