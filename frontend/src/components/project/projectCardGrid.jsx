import React from 'react';
import ProjectCard from "./projectCard.jsx";
import {Row, Col} from 'reactstrap';

// MEIN HOODIE STONE ISLAND ICH DRIP'
class ProjectCardGrid {
    constructor(props, numberOfCards, projects, cardsPerRow=4){
        this.props = props;
        this.numberOfCards = numberOfCards;
        this.projects = projects;
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
                        {ProjectCard(issuesInRow[colCount])}
                    </Col>
                    );
        };
        return row; // Return the Columns in the row to the generateRow function
    }

    generateRows(){
        var rowCount;
        let rows = [];
        console.log(`Rows: ${Math.ceil(this.numberOfCards/this.cardsPerRow)}`);
        console.log('this.cardSize:',this.cardSize);
        console.log('projects:', this.projects)

        for (rowCount = 0; rowCount < Math.ceil(this.numberOfCards/this.cardsPerRow); rowCount++){
            rows.push(
                    <Row className={"mx-md-" + this.cardSize} key={"Row " + rowCount}>
                        {this.generateColumns(this.projects.slice(this.cardsPerRow*rowCount, (this.cardsPerRow*rowCount)+this.cardsPerRow), rowCount)}
                    </Row>
                );
        };

        this.grid = rows;
        return rows;
    }

    updateGrid(projects){
        this.projects = projects;
        console.log("toto" + this.projects)
        return this.getGrid();
    }

    getGrid(){
        if (typeof this.projects != 'undefined')
            this.generateRows();
        return(this.grid);
    }

}

export default ProjectCardGrid;
