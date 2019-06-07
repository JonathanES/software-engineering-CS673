DROP DATABASE IF EXISTS swellodeskDatabase;
CREATE DATABASE swellodeskDatabase;
USE swellodeskDatabase;

CREATE TABLE `Tasks` (
  `TaskID` integer not null auto_increment,
  `TaskName` varchar(30) not null,
  `TaskInfo` varchar(2048) not null,
  `Priority` integer not null,
  `CreatedDate` timestamp not null,
  `ExpectedDuration` integer not null,
  `ActualTimeSpent` integer,
  PRIMARY KEY (`TaskID`)
);

CREATE TABLE `Users` (
  `UserID` integer not null auto_increment,
  `username` varchar(30) not null,
  `email` varchar(50) unique not null,
  `password` varchar(64) not null,
  `AccountStatusID` integer not null  default 1,
  PRIMARY KEY (`UserID`),
  KEY `FK` (`AccountStatusID`)
);

CREATE TABLE `AccountStatus` (
  `AccountStatusId` integer not null auto_increment,
  `Status` varchar(30) not null,
  PRIMARY KEY (`AccountStatusId`)
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

CREATE TABLE `GroupUsers` (
  `GroupID` integer not null auto_increment,
  `UserID` integer not null,
  `GroupName` varchar(64) not null,
  PRIMARY KEY (`GroupID`),
  KEY `FK` (`UserID`)
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

CREATE TABLE `ProjectUsers` (
  `UserID` integer not null,
  `ProjectID` integer not null,
  KEY `PK,FK` (`UserID`, `ProjectID`)
);

CREATE TABLE `Projects` (
  `ProjectID` integer not null auto_increment,
  `ProjectName` varchar(64) not null,
  PRIMARY KEY (`ProjectID`)
);

CREATE TABLE `MileStones` (
  `MSID` integer not null auto_increment,
  `ProjectID` integer not null,
  `Name` varchar(64) not null,
  `Date` timestamp not null,
  PRIMARY KEY (`MSID`),
  KEY `FK` (`ProjectID`)
);

CREATE TABLE `UserTasks` (
  `TaskID` integer not null,
  `UserID` integer not null,
  `ProjectID` integer not null,
  KEY `PK,FK` (`TaskID`, `UserID`, `ProjectID`)
);

CREATE TABLE `IssueStatus` (
  `IssueStatusId` integer not null auto_increment,
  `Status` varchar(30) not null,
  PRIMARY KEY (`IssueStatusId`)
);

CREATE TABLE `Issues` (
  `IssueID` integer not null auto_increment,
  `ProjectID` integer not null,
  `IssueStatusID` Integer,
  `AssigneeID` integer not null,
  `AssignedToID` integer not null,
  `Description` varchar(4096) not null,
  `Summary` varchar(4096) not null,
  `DateCreated` timestamp not null,
  `LastUpdate` timestamp not null,
  `DataResolved` boolean default false,
  PRIMARY KEY (`IssueID`),
  KEY `FK` (`ProjectID`, `IssueStatusID`, `AssigneeID`, `AssignedToID`)
);

CREATE TABLE `Comments` (
  `CommentID` integer not null auto_increment,
  `IssueID` integer not null,
  `CreatedBy` integer not null,
  `DateCreated` timestamp not null,
  `Message` varchar(4096) not null,
  PRIMARY KEY (`CommentID`),
  KEY `FK` (`IssueID`, `CreatedBy`)
);

