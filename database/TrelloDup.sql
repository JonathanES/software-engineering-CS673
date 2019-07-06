USE swellodeskDatabase;



INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'erhan','erhan','P3m7e0NbBTIWUdrv03TNxoHcBvqmXjdOODN7iMoEbeo=','DObTc');
INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'yyy','yyy','8q/RystUQaXmWnpGCl+YmLe5iwiqYyOi5TyLmpaGzYY=','zmlYY');
INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'jonathan','jonathan','GJ9AA0vnoZnx+piRZo7jq2BJ+C04xovnD1luqy4YV7c=','njviJ');
INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'chris','chris','Ln0sA6lQeuJl7PW1NWiFpTOTogKdJBOUmXJloaJa78Y=','njviJ');
INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'clement','clement','Ln0sA6lQeuJl7PW1NWiFpTOTogKdJBOUmXJloaJa78Y=','1QANg');
INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'james','james','GJ9AA0vnoZnx+piRZo7jq2BJ+C04xovnD1luqy4YV7c=','0oqiA');
INSERT INTO Users(AccountStatusID,username, email, password, salt) Values(1,'saravana','saravana','BDpxh3TFcr2KJa2+sb/NXAJWrhHOz5+cP5JdDlK+r4k=','JNpJO');

Select * From Users;

INSERT INTO Projects(ProjectName,DateCreated,DueDate) Values('Iteration 1',NOW(), '2019-06-27');
INSERT INTO Projects(ProjectName,DateCreated,DueDate) Values('Iteration 2',NOW(), '2019-07-12');
INSERT INTO Projects(ProjectName,DateCreated,DueDate) Values('Iteration 3',NOW(), '2019-08-01');
Select * from Projects;

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(1,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(1,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(1,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(2,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(2,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(2,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(3,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(3,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(3,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(4,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(4,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(4,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(5,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(5,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(5,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(6,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(6,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(6,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(7,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(7,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(7,4,1);

INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(8,2,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(8,3,1);
INSERT INTO ProjectUsers(UserID, ProjectID, AccountTypeID) Values(8,4,1);
Select * From ProjectUsers;


INSERT INTO Categories(ProjectID, CategoryName) Values(2,'Feature Set');
INSERT INTO Categories(ProjectID, CategoryName) Values(2,'Backend Todo');
INSERT INTO Categories(ProjectID, CategoryName) Values(2,'Backend Done');
INSERT INTO Categories(ProjectID, CategoryName) Values(2,'Frontend Todo');
INSERT INTO Categories(ProjectID, CategoryName) Values(2,'Frontend Done');
INSERT INTO Categories(ProjectID, CategoryName) Values(2,'DevOps');
Select * from Categories;


INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(2,2,4,2,1,'Creating messaging groups','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(2,2,4,3,3,'Save char into database','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(2,2,4,2,3,'Direct messaging','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(3,3,4,2,3,'[BUG] Do not display a char to everybody','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(3,3,4,1,2,'update direct message','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(3,3,6,1,2,'create issue backend support','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(3,3,7,2,2,'Finish Milestones Controller','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,2,3,2,'able to add tasj to database table','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,2,3,2,'add priority status table','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,4,3,2,'get direct messages of a chat','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,4,3,2,'insert direct message in database','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,2,3,2,'create a model for AccountType','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,2,3,2,'create a model for ProjectUsers','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,7,3,2,'Create comments','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(4,4,2,3,2,'backend support for Projects Table','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(5,5,8,1,2,'Add Menubar with tabs','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(5,5,5,1,2,'Create Login Interface','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(5,5,5,2,2,'Login and Register page html+css','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(5,5,8,3,2,'Mainpage design html+css','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(6,6,3,3,3,'Create the messaging interface','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(7,7,4,3,3,'Deploy the database on AWS','N/A','2019-06-06',10,10);
INSERT INTO Tasks(ParentID, CategoryID, UserID, StatusID, PriorityID, TaskName, TaskInfo, CreatedDate, ExpectedDuration, ActualTimeSpent) Values(7,7,4,1,3,'Deplyed the backend and frontend on AWS','N/A','2019-06-06',10,10);
Select * from Tasks;


INSERT INTO Comments(IssueID, TaskID, CreatedBy, DateCreated, Message) Value(1,3,2,'2019-07-06','Awesome');
INSERT INTO Comments(IssueID, TaskID, CreatedBy, DateCreated, Message) Value(1,3,5,'2019-07-06','Perfect');
INSERT INTO Comments(IssueID, TaskID, CreatedBy, DateCreated, Message) Value(1,4,2,'2019-07-06','Magnificant');
INSERT INTO Comments(IssueID, TaskID, CreatedBy, DateCreated, Message) Value(1,5,3,'2019-07-06','Boo');
INSERT INTO Comments(IssueID, TaskID, CreatedBy, DateCreated, Message) Value(1,6,4,'2019-07-06','foo');

Select * from Comments;









