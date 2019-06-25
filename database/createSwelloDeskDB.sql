DROP DATABASE IF EXISTS swellodeskDatabase;
CREATE DATABASE swellodeskDatabase;
USE swellodeskDatabase;

CREATE TABLE `Comments` (
  `CommentID` integer not null auto_increment,
  `IssueID` integer not null,
  `TaskID` Integer not null,
  `CreatedBy` integer not null,
  `DateCreated` timestamp not null,
  `Message` varchar(4096) not null,
  PRIMARY KEY (`CommentID`),
  KEY `FK` (`IssueID`, `TaskID`, `CreatedBy`)
);

CREATE TABLE `Categories` (
  `CategoryID` integer not null auto_increment,
  `ProjectID` integer not null,
  `CategoryName` varchar(64) not null,
  `DateCreated` timestamp not null,
  `DueDate` timestamp not null,
  PRIMARY KEY (`CategoryID`),
  KEY `FK` (`ProjectID`)
);

CREATE TABLE `AccountStatus` (
  `AccountStatusID` integer not null auto_increment,
  `Status` varchar(30) not null,
  PRIMARY KEY (`AccountStatusID`)
);

CREATE TABLE `Projects` (
  `ProjectID` integer not null auto_increment,
  `ProjectName` varchar(64) not null,
  `DateCreated` timestamp not null,
  `DueDate` timestamp not null,
  PRIMARY KEY (`ProjectID`)
);

CREATE TABLE `TaskStatus` (
  `StatusID` integer not null auto_increment,
  `Status` varchar(64) not null,
  PRIMARY KEY (`StatusID`)
);

CREATE TABLE `GroupMessaging` (
  `MessageID` integer not null auto_increment,
  `UserID` integer not null,
  `GroupID` integer not null,
  `Date` timestamp not null,
  `Message` varchar(2048) not null,
  PRIMARY KEY (`MessageID`),
  KEY `FK` (`UserID`, `GroupID`)
);

CREATE TABLE `GroupUsers` (
  `UserID` integer not null,
  `GroupID` integer not null,
  KEY `PK,FK` (`UserID`, `GroupID`)
);

CREATE TABLE `Users` (
  `UserID` integer not null auto_increment,
  `username` varchar(30) not null,
  `email` varchar(50) unique not null,
  `password` varchar(64) not null,
  `salt` VARCHAR(8) not null,
  `AccountStatusID` integer not null  default 1,
  PRIMARY KEY (`UserID`),
  KEY `FK` (`AccountStatusID`)
);

CREATE TABLE `ProjectUsers` (
  `UserID` integer not null,
  `ProjectID` integer not null,
  `AccountTypeId` integer not null,
  KEY `PK,FK` (`UserID`, `ProjectID`, `AccountTypeId`)
);

CREATE TABLE `Groups` (
  `GroupID` integer not null auto_increment,
  `GroupName` varchar(64) not null,
  PRIMARY KEY (`GroupID`)
);

CREATE TABLE `Tasks` (
  `TaskID` integer not null auto_increment,
  `ParentID` integer not null,
  `CategoryID` Integer not null,
  `UserID` integer not null,
  `TaskName` varchar(30) not null,
  `TaskInfo` varchar(2048) not null,
  `Priority` integer not null,
  `CreatedDate` timestamp not null,
  `ExpectedDuration` integer,
  `ActualTimeSpent` integer,
  `StatusID` integer not null,
  PRIMARY KEY (`TaskID`),
  KEY `FK` (`ParentID`, `CategoryID`, `UserID`, `Priority`, `StatusID`)
);

CREATE TABLE `MileStones` (
  `MSID` integer not null auto_increment,
  `ProjectID` integer not null,
  `Name` varchar(64) not null,
  `Date` timestamp not null,
  PRIMARY KEY (`MSID`),
  KEY `FK` (`ProjectID`)
);

CREATE TABLE `AccountType` (
  `AccountTypeID` integer not null auto_increment,
  `Type` varchar(30) not null,
  PRIMARY KEY (`AccountTypeID`)
);

CREATE TABLE `Issues` (
  `IssueID` integer not null auto_increment,
  `ProjectID` integer not null,
  `IssueStatusID` Integer,
  `AssigneeID` integer not null,
  `AssignedToID` integer not null,
  `CommentID` integer not null,
  `PriorityID` integer not null,
  `IssueName` varchar(64) not null,
  `Summary` varchar(4096) not null,
  `DateCreated` timestamp not null,
  `LastUpdate` timestamp not null,
  `DateResolved` timestamp not null,
  `IsResolved` boolean default false,
  PRIMARY KEY (`IssueID`),
  KEY `FK` (`ProjectID`, `IssueStatusID`, `AssigneeID`, `AssignedToID`, `CommentID`, `PriorityID`)
);

CREATE TABLE `ProjectsMilestones` (
  `MilestoneID` integer not null auto_increment,
  `ProjectID` integer not null,
  `MilestoneName` varchar(64) not null,
  `Date` timestamp not null,
  PRIMARY KEY (`MilestoneID`),
  KEY `FK` (`ProjectID`)
);

CREATE TABLE `DirectMessaging` (
  `MessageID` integer not null auto_increment,
  `SenderID` integer not null,
  `ReceiverID` integer not null,
  `Date` timestamp not null,
  `Message` varchar(2048) not null,
  PRIMARY KEY (`MessageID`),
  KEY `FK` (`SenderID`, `ReceiverID`)
);

CREATE TABLE `IssueStatus` (
  `IssueStatusID` integer not null auto_increment,
  `Status` varchar(30) not null,
  PRIMARY KEY (`IssueStatusID`)
);

CREATE TABLE `Priority` (
  `PriorityIDStatusID` integer not null auto_increment,
  `Priority` varchar(64) not null,
  PRIMARY KEY (`PriorityIDStatusID`)
);






