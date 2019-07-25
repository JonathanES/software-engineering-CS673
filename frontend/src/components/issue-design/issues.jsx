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
                            [1, 1, 1, 1, 1, 1, "Test 1", "Summary 1", "Today", "Today", "Never", 0, 0],
                            [2, 1, 1, 1, 1, 2, "Test 2", "Summary 2", "Today", "Today", "Never", 0, 0],
                            [3, 1, 1, 1, 1, 2, "Test 3", "Summary 3", "Today", "Today", "Never", 0, 0],
                            [4, 1, 1, 1, 1, 1, "Test 4", "Summary 4", "Today", "Today", "Never", 0, 0],
                            [5, 1, 1, 1, 1, 1, "Test 5", "Summary 5", "Today", "Today", "Never", 0, 0],
                            [6, 1, 1, 1, 1, 3, "Test 6", "Summary 6", "Today", "Today", "Never", 0, 0]
        ];
        this.icg = new IssueCardGrid(props, 6, this.rowObjects);
    }

    // function setupGrid(listOfIssues, columns=4){
    //
    // }

    render() {
        return (
            IssueCardGrid.getGrid()

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
