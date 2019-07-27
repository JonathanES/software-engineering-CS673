import React from 'react';
//import IssueCard from "./issuecard.jsx";
import {Row, Col} from 'reactstrap';

// MEIN HOODIE STONE ISLAND ICH DRIP'
class IssueCardGrid {
    constructor(props, numberOfCards, issues, cardsPerRow=4){
        this.props = props;
        this.numberOfCards = numberOfCards;
        this.issues = issues;
        this.cardRows = [];
        this.cardsPerRow = cardsPerRow;
        this.cardSize = 12/cardsPerRow;
    }

    generateColumns(issuesInRow, rowCount){
        var colCount;
        let row = [];
        console.log("Test mee");
        console.log(issuesInRow);
        for (colCount = 0; colCount < issuesInRow.length; colCount++){
            // Pass the RowObject from the DB to thee the Issue card to return the appropriately coloured card and push it into our row
            row.push(<Col className={"my-md-" + this.cardSize} key={"Issue " + (rowCount*4) + colCount}>
                        {IssueCard(issuesInRow[colCount])}
                    </Col>
                    );
        };
        return row; // Return the Columns in the row to the generateRow function
    }

    generateRows(){
        var rowCount;
        let rows = [];
        console.log(`Rows: ${Math.ceil(this.numberOfCards/this.cardsPerRow)}`)
        for (rowCount = 0; rowCount < Math.ceil(this.numberOfCards/this.cardsPerRow); rowCount++){
            rows.push(
                    <Row className={"mx-md-" + this.cardSize} key={"Row " + rowCount}>
                        {this.generateColumns(this.issues.slice(this.cardsPerRow*rowCount, (this.cardsPerRow*rowCount)+this.cardsPerRow), rowCount)}
                    </Row>
                );
        };

        this.grid = rows;
        return rows;
    }

    getGrid(){
        this.generateRows();
        return(this.grid);
    }

}

export default IssueCardGrid;