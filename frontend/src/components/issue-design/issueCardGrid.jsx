import React from 'react';
import IssueCard from "./issuecard.jsx";
import IssueCreationCard from "./issueCreationCard.jsx"
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

        if(rowCount == 0){ // Firstly add the Creation Card if we are on the first row
            row.push(<Col className={"my-md-" + this.state.cardSize} key={"CreationCard 1"}>
                        <IssueCreationCard/>
                    </Col>);
        }

        for (colCount = 0; colCount < issuesInRow.length; colCount++){  // This should have a length of issuesInRow-1 when we are on the first row
            let currentIssue = issuesInRow[colCount];

            // Get the card from the instance and push it onto the row array
            row.push(<Col className={"my-md-" + this.state.cardSize} key={"Issue " + ((rowCount*4) + colCount)}>
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
        this.state.grid = rows;
        return rows;
    }

    updateIssues(newIssues){
        let filteredIssues = newIssues.filter((value, index, arr) => {
            return value.IssueID > 1;
        });

        if(filteredIssues.length > 0){
            this.setState({
                numberOfCards: filteredIssues.length,
                issues: filteredIssues
            });
        }
    }

    updateGrid(){
        if(this.state.issues != ""){
            let newGrid = this.generateRows();
            this.setState({
                grid: newGrid
            });
        }
    }


    render(){
        return(
            this.state.grid
        )
    }

}
