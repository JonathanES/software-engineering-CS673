import React, {Component} from 'react';
import { connect } from "react-redux";
import {Card, Button, CardTitle, CardText, Row, Col, Container} from 'reactstrap';
import {createIssue, updateIssueStatus, getIssues, getIssueWithID, createNewIssueStatus} from "../../socket/issuesSocket.js";

import {IssueCardGrid} from "./issueCardGrid.jsx";

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
});

// ISSUE FIELDS: ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved)
class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: ""
        };
    }

    componentDidMount(){
        this.setState({
            grid: <IssueCardGrid
                    numberOfCards={0}
                    issues={[]}
                    cardsPerRow={4}/>
        });
        console.log(this.props);
    }

    render() {
        return (
            this.state.grid
        );
    }
}

export default connect(mapStateToProps)(Issues);
