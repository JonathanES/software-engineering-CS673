DROP DATABASE IF EXISTS swellodeskDatabase;
CREATE DATABASE swellodeskDatabase;
USE swellodeskDatabase;



CREATE TABLE IF NOT EXISTS TaskStatus (
    StatusID INT AUTO_INCREMENT,
    StatusName VARCHAR(64) NOT NULL,
    PRIMARY KEY (StatusID)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS Priority (
    PriorityID INT AUTO_INCREMENT,
    Priority VARCHAR(64) NOT NULL,
    PRIMARY KEY (PriorityID)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS AccountStatus (
    AccountStatusID INT AUTO_INCREMENT,
    StatusName VARCHAR(30) NOT NULL,
    PRIMARY KEY (AccountStatusID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS IssueStatus (
    StatusID INT AUTO_INCREMENT,
    StatusName VARCHAR(64) NOT NULL,
    PRIMARY KEY (StatusID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT,
    AccountStatusID INT DEFAULT 0,  /* --0 for active users, 1 for deleted users */ 
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(64) NOT NULL,
    salt VARCHAR(8) NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY fk_usersasid(AccountStatusID) REFERENCES AccountStatus(AccountStatusID)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS Projects (
    ProjectID INT AUTO_INCREMENT,
    ProjectName VARCHAR(30) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DueDate TIMESTAMP NOT NULL,
    IsDeleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (ProjectID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS Categories (
    CategoryID INT AUTO_INCREMENT,
    ProjectID INT NOT NULL,
    CategoryName VARCHAR(64) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (CategoryID),
    FOREIGN KEY fk_Categoriespid(ProjectID) REFERENCES Projects(ProjectID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS Tasks (
    TaskID INT AUTO_INCREMENT,
    ParentID INT NOT NULL,
    CategoryID INT NOT NULL,
    UserID INT NOT NULL,
    StatusID INT NOT NULL,
    PriorityID INT NOT NULL,
    TaskName VARCHAR(256) NOT NULL,
    TaskInfo VARCHAR(2048) NOT NULL,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ExpectedDuration INT,
    ActualTimeSpent INT,
    IsDeleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (TaskID),
    FOREIGN KEY fk_taskpa(ParentID) REFERENCES Tasks(TaskID),
    FOREIGN KEY fk_taskca(CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY fk_taskuid(UserID) REFERENCES Users(UserID),
    FOREIGN KEY fk_tasksid(StatusID) REFERENCES TaskStatus(StatusID),
    FOREIGN KEY fk_taskpid(PriorityID) REFERENCES Priority(PriorityID)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS Issues (
    IssueID INT AUTO_INCREMENT,
    ProjectID INT NOT NULL,
    IssueStatusID INT,
    AssigneeID INT NOT NULL,
    AssignedToID INT NOT NULL,
    PriorityID INT NOT NULL,
    IssueName VARCHAR(256) NOT NULL,
    Summary VARCHAR(4096) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL,
    DateResolved TIMESTAMP,
    IsResolved BOOLEAN DEFAULT FALSE,
    IsDeleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (IssueID),
    FOREIGN KEY fk_issuespid(ProjectID) REFERENCES Projects(ProjectID),
    FOREIGN KEY fk_issuesisid(IssueStatusID) REFERENCES IssueStatus(StatusID),
    FOREIGN KEY fk_issuesasid(AssigneeID) REFERENCES Users(UserID),
    FOREIGN KEY fk_issuesastid(AssignedToID) REFERENCES Users(UserID),
    FOREIGN KEY fk_issuesapid(PriorityID) REFERENCES Priority(PriorityID)
)  ENGINE=INNODB;



CREATE TABLE IF NOT EXISTS Comments (
    CommentID INT AUTO_INCREMENT,
    IssueID INT NOT NULL,
    TaskID INT NOT NULL,
    CreatedBy INT NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message VARCHAR(4096) NOT NULL,
    IsDeleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (CommentID),
    FOREIGN KEY fk_commentsiid(IssueID) REFERENCES Issues(IssueID),
    FOREIGN KEY fk_commentstid(TaskID) REFERENCES Tasks(TaskID),
    FOREIGN KEY fk_commentscid(CreatedBy) REFERENCES Users(UserID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS AccountType (
    AccountTypeID INT AUTO_INCREMENT,
    TypeName VARCHAR(30) NOT NULL,
    PRIMARY KEY (AccountTypeID)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS DirectMessaging (
    MessageID INT AUTO_INCREMENT,
    SenderID INT NOT NULL,
    ReceiverID INT NOT NULL,
    MessageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message VARCHAR(2048) NOT NULL,
    PRIMARY KEY (MessageID),
    FOREIGN KEY fk_directmessagesid(SenderID) REFERENCES Users(UserID),
    FOREIGN KEY fk_directmessagerid(ReceiverID) REFERENCES Users(UserID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS MessageGroups (
    GroupID INT AUTO_INCREMENT,
    GroupName VARCHAR(64) NOT NULL,
    PRIMARY KEY (GroupID)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS GroupMessaging (
    MessageID INT AUTO_INCREMENT,
    UserID INT NOT NULL,
    GroupID INT NOT NULL,
    MessageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message VARCHAR(2048) NOT NULL,
    PRIMARY KEY (MessageID),
    FOREIGN KEY fk_groupmessageuid(UserID) REFERENCES Users(UserID),
    FOREIGN KEY fk_groupmessagegid(GroupID) REFERENCES MessageGroups(GroupID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS GroupUsers (
    UserID INT,
    GroupID INT,
    PRIMARY KEY (UserID, GroupID),
    FOREIGN KEY fk_groupusersuid(UserID) REFERENCES Users(UserID),
    FOREIGN KEY fk_groupusersgid(GroupID) REFERENCES MessageGroups(GroupID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS ProjectUsers (
    UserID INT,
    ProjectID INT,
    AccountTypeID INT,
    PRIMARY KEY (UserID, ProjectID, AccountTypeID),
    FOREIGN KEY fk_projectusersuid(UserID) REFERENCES Users(UserID),
    FOREIGN KEY fk_projectuserspid(ProjectID) REFERENCES Projects(ProjectID),
    FOREIGN KEY fk_projectusersaid(AccountTypeID) REFERENCES AccountType(AccountTypeID)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS ProjectMileStones (
    MilestonesID INT AUTO_INCREMENT,
    ProjectID INT,
    MilestoneName VARCHAR(64) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DueDate TIMESTAMP NOT NULL,
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (MilestonesID),
    FOREIGN KEY fk_milestonepid(ProjectID) REFERENCES Projects(ProjectID)
)  ENGINE=INNODB;



ALTER TABLE Projects AUTO_INCREMENT = 1;
ALTER TABLE TaskStatus AUTO_INCREMENT = 1;
ALTER TABLE Tasks AUTO_INCREMENT = 1;

ALTER TABLE Priority AUTO_INCREMENT = 1;
ALTER TABLE Categories AUTO_INCREMENT = 1;
ALTER TABLE ProjectMileStones AUTO_INCREMENT = 1;
ALTER TABLE AccountType AUTO_INCREMENT = 1;
ALTER TABLE AccountStatus AUTO_INCREMENT = 1;
ALTER TABLE IssueStatus AUTO_INCREMENT = 1;
ALTER TABLE Issues AUTO_INCREMENT = 1;
ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE MessageGroups AUTO_INCREMENT = 1;
ALTER TABLE GroupMessaging AUTO_INCREMENT = 1;
ALTER TABLE DirectMessaging AUTO_INCREMENT = 1;
ALTER TABLE Comments AUTO_INCREMENT = 1;







