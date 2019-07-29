import React from 'react';
import IssueCard from "./issuecard.jsx";
import {Row, Col} from 'reactstrap';

import {getIssues} from "../../socket/issuesSocket.js";

// MEIN HOODIE STONE ISLAND ICH DRIP'
export class IssueCardGrid extends React.Component {
    constructor(props, numberOfCards, issues, cardsPerRow=4){
        super(props);

        this.state = {
            numberOfCards: this.props.numberOfCards,
            issues: this.props.issues,
            cardsPerRow: this.props.cardsPerRow,
            cardSize: 12/this.props.cardsPerRow,
            grid: ""
        };

        // Call the socket for getting the Issues from the DB with our overwritting callback to set the state
        getIssues((data) => {
            this.updateIssues(data);
            this.updateGrid();
        });
    }

    generateColumns(issuesInRow, rowCount){
        var colCount;
        var currentIssueCard;
        let row = [];
        // console.log("Test mee");
        // console.log(issuesInRow);

        for (colCount = 0; colCount < issuesInRow.length; colCount++){
            let currentIssue = issuesInRow[colCount];

            // Get the card from the instance and push it onto the row array
            row.push(<Col className={"my-md-" + this.state.cardSize} key={"Issue " + (rowCount*4) + colCount}>
                        <IssueCard
                            IssueID={currentIssue.IssueID}
                            ProjectID={currentIssue.ProjectID}
                            IssueStatusID={currentIssue.IssueStatusID}
                            AssigneeID={currentIssue.AssigneeID}
                            AssignedToID={currentIssue.AssignedToID}
                            PriorityID={currentIssue.PriorityID}
                            IssueName={currentIssue.IssueName}
                            Summary={currentIssue.Summary}
                            DateCreated={currentIssue.DateCreated}
                            LastUpdate={currentIssue.LastUpdate}
                            DateResolved={currentIssue.DateResolved}
                            isResolved={currentIssue.IsResolved}
                            IsDeleted={currentIssue.IsDeleted}
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
        for (rowCount = 0; rowCount < Math.ceil(this.state.numberOfCards/this.state.cardsPerRow); rowCount++){
            rows.push(
                    <Row className={"mx-md-" + this.state.cardSize} key={"Row " + rowCount}>
                        {this.generateColumns(this.state.issues.slice(this.state.cardsPerRow*rowCount, (this.state.cardsPerRow*rowCount)+this.state.cardsPerRow), rowCount)}
                    </Row>
                );
        };
        this.state.grid = rows;
        return rows;
    }

    updateIssues(newIssues){
        this.setState({
            numberOfCards: newIssues.length,
            issues: newIssues
        });
    }

    updateGrid(){
        let newGrid = this.generateRows();
        this.setState({
            grid: newGrid
        })
    }


    render(){
        return(
            this.state.grid
        )
    }

}
