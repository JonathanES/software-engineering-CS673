import React, {Component} from 'react';
import {Card, Button, CardTitle, CardText, Row, Col, Container} from 'reactstrap';

import IssueCard from "./issuecard.jsx";
import IssueCardGrid from "./issueCardGrid.jsx";

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    //taskname: state.Task.newtask
});

// ISSUE FIELDS: ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved)
class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            id_user: '',
            grid: [IssueCard(props, "Project ID 1", "IssueStatus 1", "AssigneeID 1", "AssignedToID 1", 1, "IssueName 1", "Summary 1", "DateCreated 1", "LasteUpdate 1", "DateResolved 1", "IsResolved 1"),
                   IssueCard(props, "Project ID 2", "IssueStatus 2", "AssigneeID 2", "AssignedToID 2", 2, "IssueName 2", "Summary 2", "DateCreated 2", "LasteUpdate 2", "DateResolved 2", "IsResolved 2"),
                   IssueCard(props, "Project ID 3", "IssueStatus 3", "AssigneeID 3", "AssignedToID 3", 3, "IssueName 3", "Summary 3", "DateCreated 3", "LasteUpdate 3", "DateResolved 3", "IsResolved 3"),]
        };


        // Test Here
        // IssueID, ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted
        this.rowObjects = [
                            {"IssueID": 1, "ProjectID":1, "IssueStatusID":1, "AssigneeID":1, "AssignedToID":1, "PriorityID":1, "IssueName": "Test 1", "Summary":"Summary 1", "DateCreated":"Today", "LastUpdate":"Today", "DateResolved":"Never", "IsResolved":0, "IsDeleted":0},
                            {"IssueID": 2, "ProjectID":1, "IssueStatusID":1, "AssigneeID":1, "AssignedToID":1, "PriorityID":1, "IssueName": "Test 2", "Summary":"Summary 2", "DateCreated":"Today", "LastUpdate":"Today", "DateResolved":"Never", "IsResolved":0, "IsDeleted":0},
                            {"IssueID": 3, "ProjectID":1, "IssueStatusID":1, "AssigneeID":1, "AssignedToID":1, "PriorityID":2, "IssueName": "Test 3", "Summary":"Summary 3", "DateCreated":"Today", "LastUpdate":"Today", "DateResolved":"Never", "IsResolved":0, "IsDeleted":0},
                            {"IssueID": 4, "ProjectID":1, "IssueStatusID":1, "AssigneeID":1, "AssignedToID":1, "PriorityID":2, "IssueName": "Test 4", "Summary":"Summary 4", "DateCreated":"Today", "LastUpdate":"Today", "DateResolved":"Never", "IsResolved":0, "IsDeleted":0},
                            {"IssueID": 5, "ProjectID":1, "IssueStatusID":1, "AssigneeID":1, "AssignedToID":1, "PriorityID":1, "IssueName": "Test 5", "Summary":"Summary 5", "DateCreated":"Today", "LastUpdate":"Today", "DateResolved":"Never", "IsResolved":0, "IsDeleted":0},
                            {"IssueID": 6, "ProjectID":1, "IssueStatusID":1, "AssigneeID":1, "AssignedToID":1, "PriorityID":3, "IssueName": "Test 6", "Summary":"Summary 6", "DateCreated":"Today", "LastUpdate":"Today", "DateResolved":"Never", "IsResolved":0, "IsDeleted":0}
        ];
        this.icg = new IssueCardGrid(props, 6, this.rowObjects);
    }

    render() {
        return (
            this.icg.getGrid()
        );
    }
}

export default Issues;
