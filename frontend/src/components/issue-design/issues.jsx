import React, {Component} from 'react';
import {Card, Button, CardTitle, CardText, Row, Col, Container} from 'reactstrap';
import IssueCardGrid from "./issueCardGrid.jsx";
import {createIssue, updateIssueStatus, getIssues, getIssueWithID, createNewIssueStatus} from "../../socket/issuesSocket.js";

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    //taskname: state.Task.newtask
});

// ISSUE FIELDS: ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved)
class Issues extends React.Component {
    constructor(props) {
        super(props);

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
        this.state = {
            email: '',
            password: '',
            id_user: '',
            grid: this.icg.getGrid()
        };

    }

    // function setupGrid(listOfIssues, columns=4){
    //
    // }

    render() {
        return (
            this.state.grid

            // <div>
            // <Row className="mx-md-3">
            //     <Col className="my-md-3">
            //         <Card body>
            //             <CardTitle>Special Title Treatment</CardTitle>
            //             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            //             <Button>Go somewhere</Button>
            //         </Card>
            //     </Col>
            //     <Col className="my-md-3">
            //         <Card body>
            //             <CardTitle>Special Title Treatment</CardTitle>
            //             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            //             <Button>Go somewhere</Button>
            //         </Card>
            //     </Col>
            //     <Col className="my-md-3">
            //         <Card body>
            //             <CardTitle>Special Title Treatment</CardTitle>
            //             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            //             <Button>Go somewhere</Button>
            //         </Card>
            //     </Col>
            //     <Col className="my-md-3">
            //         <Card body>
            //             <CardTitle>Special Title Treatment</CardTitle>
            //             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            //             <Button>Go somewhere</Button>
            //         </Card>
            //     </Col>
            // </Row>
            // <Row className="mx-md-3">
            //     <Col className="my-md-3">
            //         <Card body>
            //             <CardTitle>Special Title Treatment</CardTitle>
            //             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            //             <Button>Go somewhere</Button>
            //         </Card>
            //     </Col>
            //     <Col className="my-md-3">
            //         <Card body>
            //             <CardTitle>Special Title Treatment</CardTitle>
            //             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            //             <Button>Go somewhere</Button>
            //         </Card>
            //     </Col>
            // </Row>
            // </div>
        );
    }
}

export default Issues;
