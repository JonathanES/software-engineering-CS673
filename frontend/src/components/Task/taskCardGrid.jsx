import React from 'react';
import TaskCard from "./taskCard.jsx";
import {Row, Col} from 'reactstrap';

// MEIN HOODIE STONE ISLAND ICH DRIP'
const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    updateTask: state.task.updateTask,
    task: state.task.task
    //taskname: state.Task.newtask
});

class TaskCardGrid {
    constructor(props, numberOfCards, tasks, cardsPerRow=4){
        this.props = props;
        this.numberOfCards = numberOfCards;
        this.tasks = tasks;
        this.cardRows = [];
        this.cardsPerRow = cardsPerRow;
        this.cardSize = 12/cardsPerRow;
    }

    generateColumns(tasksInRow, rowCount){
        var colCount;
        var currentTaskCard;
        let row = [];
        console.log("Test mee");
        console.log(tasksInRow);

        for (colCount = 0; colCount < tasksInRow.length; colCount++){
            currentTaskCard = new TaskCard(tasksInRow[colCount]); // Generate a new card instance
            // Get the card from the instance and push it onto the row array
            row.push(<Col className={"my-md-" + this.cardSize} key={"Issue " + (rowCount*4) + colCount}>
                        {currentTaskCard.getCard()}
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
                        {this.generateColumns(this.tasks.slice(this.cardsPerRow*rowCount, (this.cardsPerRow*rowCount)+this.cardsPerRow), rowCount)}
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

export default TaskCardGrid;