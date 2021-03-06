import React from 'react';
import IssueCard from "./issuecard.jsx";
import IssueCreationCard from "./issueCreationCard.jsx"
import {Row, Col} from 'reactstrap';

import {createIssue, getIssues, deleteIssue, updateIsResolved, getComments} from "../../socket/issuesSocket.js";

// MEIN HOODIE STONE ISLAND ICH DRIP'
export class IssueCardGrid extends React.Component {
    constructor(props){
        super(props);

        // This binds are required since these methods are used in other classes with their own "this"s
        this.deleteIssueFromGrid = this.deleteIssueFromGrid.bind(this);
        this.createIssueForGrid = this.createIssueForGrid.bind(this);
        this.toggleResolveOnIssue = this.toggleResolveOnIssue.bind(this);

        this.handleGotIssues = this.handleGotIssues.bind(this);
        this.handleDeleteIssue = this.handleDeleteIssue.bind(this);
        this.handleCreateIssue = this.handleCreateIssue.bind(this);
        this.handleUpdatedIsResolved = this.handleUpdatedIsResolved.bind(this);
        this.handleGotAllComments = this.handleGotAllComments.bind(this);
        // this.updateIssues = this.updateIssues.bind(this);
        // this.updateGrid = this.updateGrid.bind(this);

        this.state = {
            numberOfCards: this.props.numberOfCards,
            issues: this.props.issues,
            cardsPerRow: this.props.cardsPerRow,
            cardSize: 12/this.props.cardsPerRow,
            grid: "",
            allComments: ""
        };
    }

    componentDidMount(){
        // Call the socket for getting the Issues from the DB with our overwritting callback to set the state

        getComments(this.handleGotAllComments); // This now also gets the issues as well

        //console.log(`Username is: ${this.props.username} and userID is: ${this.props.userID}`);
    }


    handleGotIssues(data){
        this.updateIssues(data);
        this.updateGrid();
    }

    handleDeleteIssue(data){
        getIssues(this.handleGotIssues);
    }

    handleCreateIssue(data){
        getIssues(this.handleGotIssues); // Get the new issues from the DB and update the displayed grid state
    }

    handleUpdatedIsResolved(data){
        getIssues(this.handleGotIssues);
    }

    handleGotAllComments(data){
        this.setState({
            allComments:data
        });

        getIssues(this.handleGotIssues); // Get the issues after we get all the comments so we can pass them to the issues
    }


    generateColumns(issuesInRow, rowCount){
        var colCount;
        var currentIssueCard;
        let row = [];

        if(rowCount == 0){ // Firstly add the Creation Card if we are on the first row
            row.push(<Col className={"my-md-" + this.state.cardSize} key={"CreationCard 1"}>
                        <IssueCreationCard
                        username={this.props.username}
                        userID={this.props.userID}
                        createIssue={this.createIssueForGrid}/>
                    </Col>);
        }

        for (colCount = 0; colCount < issuesInRow.length; colCount++){  // This should have a length of issuesInRow-1 when we are on the first row
            let currentIssue = issuesInRow[colCount];

            // Get the card from the instance and push it onto the row array
            row.push(<Col className={"my-md-" + this.state.cardSize} key={"Issue " + ((rowCount*4) + colCount)}>
                        <IssueCard
                            IssueID={currentIssue.IssueID}
                            ProjectID={currentIssue.ProjectID}
                            ProjectName={currentIssue.ProjectName}
                            IssueStatusID={currentIssue.IssueStatusID}
                            AssigneeUsername={currentIssue.AssigneeUsername}
                            AssignedToUsername={currentIssue.AssignedToUsername}
                            PriorityID={currentIssue.PriorityID}
                            IssueName={currentIssue.IssueName}
                            Summary={currentIssue.Summary}
                            DateCreated={currentIssue.DateCreated}
                            LastUpdate={currentIssue.LastUpdate}
                            DateResolved={currentIssue.DateResolved}
                            IsResolved={currentIssue.IsResolved}
                            IsDeleted={currentIssue.IsDeleted}
                            deleteIssueFromGrid={this.deleteIssueFromGrid}
                            updateIsResolvedFromGrid={this.toggleResolveOnIssue}
                            comments={this.state.allComments}
                            currentUsername={this.props.username}
                            currentUserID={this.props.userID}
                        />
                    </Col>
                    );
        };


        return row; // Return the Columns in the row to the generateRow function
    }

    generateRows(){
        var rowCount;
        let rows = [];
        // console.log(`Rows: ${Math.ceil(this.numberOfCards/this.cardsPerRow)}`)
        for (rowCount = 0; rowCount < Math.ceil((this.state.numberOfCards+1)/this.state.cardsPerRow); rowCount++){ // Adding 1 for creationCard

            if(rowCount != 0){ // If we have rows that don't have the creationCard, we have to shift this slice back by 1 now to accommadate the fact the first row only grabs 3, e.g. 0-2 then we have to go from 3-6 instead of 0-3 and 4-7 for a row of 4
                rows.push(
                        <Row className={"mx-md-" + this.state.cardSize} key={"Row " + rowCount}>
                            {this.generateColumns(this.state.issues.slice((this.state.cardsPerRow*rowCount)-1, (this.state.cardsPerRow*rowCount)+this.state.cardsPerRow-1), rowCount)}
                        </Row>
                    );
            }else if(rowCount == 0){ // This is the first row so it has the creationCard which takes up one card space so pass one fewer cards to be added to this row
                rows.push(
                        <Row className={"mx-md-" + this.state.cardSize} key={"Row " + rowCount}>
                            {this.generateColumns(this.state.issues.slice(this.state.cardsPerRow*rowCount, ((this.state.cardsPerRow*rowCount)+this.state.cardsPerRow)-1), rowCount)}
                        </Row>
                    );
            }
        };
        return rows;
    }

    updateIssues(newIssues){
        let issuesNewFirst = newIssues.reverse();
        if(issuesNewFirst.length > 0){
            this.setState({
                numberOfCards: issuesNewFirst.length,
                issues: issuesNewFirst
            });
        }
    }

    updateGrid(){
        let newGrid = this.generateRows();
        // This helps clear the issueCreationCard ?!?! SHOULD FIX FOR PERFORMANCE ISSUES
        this.setState({
            grid: ""
        });
        this.setState({
            grid: newGrid
        });
    }

    deleteIssueFromGrid(issueID){
        deleteIssue(issueID, this.handleDeleteIssue);
    }

    // createIssue(issueName, issueSummary, projectID, issueStatusID, userID, responsibleUserID, priorityID, cb=createIssueCallback
    createIssueForGrid(issueName, issueSummary, issuePriority, issueProject, assignedTo){
        let issueStatusID = 1; // Unused since we now are using isResolved field in the DB
        createIssue(issueName, issueSummary, issueProject, issueStatusID, this.props.userID, assignedTo, issuePriority, this.handleCreateIssue);
    }

    toggleResolveOnIssue(issueID, isResolved){
        if(isResolved == 0){
            updateIsResolved(issueID, 1, this.handleUpdatedIsResolved);
        }else if(isResolved == 1) {
            updateIsResolved(issueID, 0, this.handleUpdatedIsResolved);
        }else {
            updateIsResolved(issueID, 1, this.handleUpdatedIsResolved);
        }
    }

    render(){
        return(
            this.state.grid
        )
    }

}
