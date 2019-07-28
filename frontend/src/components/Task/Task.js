import React from "react";
import { connect } from 'react-redux';
import { getTasksUsers } from '../../socket/taskSocket';
//import {userId} from '../../socket/userSocket';
import TaskUpdate from './taskUpdate';
import TaskCard from "./taskCard.jsx";
import '../../css/projectTask.css'
import { Card, Button, CardTitle, CardText, CardHeader, header, CardBody, CardFooter, Row, Col, Container } from 'reactstrap';


const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    updateTask: state.task.updateTask,
    task: state.task.task
    //taskname: state.Task.newtask
});


class Task extends React.Component {
    constructor(props) {
        super(props);

        this.cardsPerRow = 4;
        this.cardSize = 3;
        // this.rowObjects= [];

        // getTasksUsers(this.props.userId, (err, data) => {
        //     this.setState({ rowObjects: data });
        // });



        this.state = {
            userId: props.userId,
            username: props.username,
            getListofTasksForUser: [],
            newtask: '',
            // grid: '',

            rowObjects: []
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidUpdate(prevProps) {

        // getTasksUsers(this.props.userId, (err, data) => {
        //     this.setState({ rowObjects: data });
        // });

        if (prevProps.task.taskName != this.props.task.taskName) {
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({ getListofTasksForUser: getListofTasksForUser });
        }

        if (prevProps.task.dueDate != this.props.task.dueDate) {
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({ getListofTasksForUser: getListofTasksForUser });
        }

        if (prevProps.task.taskInfo != this.props.task.taskInfo) {
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({ getListofTasksForUser: getListofTasksForUser });
        }

        if (prevProps.task.statusID != this.props.task.statusID) {
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({ getListofTasksForUser: getListofTasksForUser });
        }

        if (prevProps.task.actualTimeSpent != this.props.task.actualTimeSpent) {
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({ getListofTasksForUser: getListofTasksForUser });
        }

        if (prevProps.task.isDeleted != this.props.task.isDeleted) {

            let listOfTask = this.state.getListofTasksForUser;
            listOfTask = listOfTask.filter(task => task.taskID != this.props.task.taskID);
            this.setState({ getListofTasksForUser: listOfTask })

        }

    }

    generateColumns(tasksInRow, rowCount) {
        var colCount;
        var currentTaskCard;
        let row = [];
        console.log("Test mee");
        console.log(tasksInRow);

        for (colCount = 0; colCount < tasksInRow.length; colCount++) {
            currentTaskCard = new TaskCard(tasksInRow[colCount]); // Generate a new card instance
            // Get the card from the instance and push it onto the row array
            row.push(<Col className={"my-md-" + this.cardSize} key={"Task " + (rowCount * 4) + colCount}>
                {currentTaskCard.getCard()}
            </Col>
            );
        };
        return row; // Return the Columns in the row to the generateRow function
    }

    generateRows(data) {
        return new Promise(resolve => {
            var rowCount;
            let rows = [];
            console.log(`Rows: ${Math.ceil(data.length / this.cardsPerRow)}`)
            for (rowCount = 0; rowCount < Math.ceil(data.length / this.cardsPerRow); rowCount++) {
                rows.push(
                    <Row className={"mx-md-" + this.cardSize} key={"Row " + rowCount}>
                        {this.generateColumns(data.slice(this.cardsPerRow * rowCount, (this.cardsPerRow * rowCount) + this.cardsPerRow), rowCount)}
                    </Row>
                );
            };
            this.grid = rows;
            resolve(rows);
        })
    }
    getUserTasks() {
        return new Promise(resolve => {
            getTasksUsers(this.props.userId, (err, data) => {
                resolve(data)
            });
        });
    }
    async getGrid() {
        const data = await this.getUserTasks();
        const res = await this.generateRows(data);
        //return res;
        // getTasksUsers(this.props.userId, (err, data) => {
        //     this.setState({ rowObjects: data }, () => {
        //         console.log(this.state.rowObjects);
        //         this.generateRows();
        //     }); //, grid: this.generateRows });
        // });
        return(res);
    }

    componentDidMount() {

       this.getGrid();


        // this.tcg = new TaskCardGrid(this.props, 6, this.rowObjects);

    }

    handleChange(event) {
        this.setState({ newtask: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handleSubmit(event) {
        console.log('Add Task button pressed before call');

        this.props.dispatch({ type: 'USER_ADD_TASK_DEMAND' });

        // dispatch: <TaskForm  dispatch={this.props.dispatch}/>;

        // addTask(this.state.userId, this.state.newtask, (err, data) => {
        //     console.log('Add Task button pressed');
        //     this.setState({ newtask: data });
        //     console.log("inside handleSubmit");

        // })
        event.preventDefault();
    }

    handleClick(e, task) {
        console.log('Calling Task Update');
        this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
    }




    render() {
        return (
            <div></div>
            // <div>
                // this.getGrid()
                    // {/* {this.grid} */}
            // </div>
                // {this.props.updateTask && <TaskUpdate dispatch={this.props.dispatch} />}
                // {!this.props.updateTask && <div class="direct">
                    // <div class="title uppercase" style={{ marginBottom: '10px' }}>{this.props.username}'s Tasks</div>

                    // {this.getGrid()}
                    // {this.grid}


                    // {/* <ul style={{display: 'block'}}> */}
                    // { // this.state.getListofTasksForUser.map(task =>
                        // <li style={{ width: '300px', height: "auto", 
                        // paddingBlock:'10px', verticalAlign:'top', 
                        // margin:'2px 2px 2px 2px' , borderRadius: '5px', 
                        // backgroundColor: "#e6e6e6", position: "relative" , 
                        // display: 'inline-block'}}>
                        //     <div id={task.taskName} onClick={(e) =>this.handleClick(e,task)}>
                        //     </div>
                        //     <div class="user-task" style={{ width: '94%', height: '200px', 
                        //         borderRadius: '5px', marginLeft: '3%', display:'block', 
                        //         marginTop: '8px', marginBottom: '8px', padding: "5px" }}>
                        //         <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> {task.taskName}</span>
                        //         <ul key={"task"+task.taskID} style={{verticalAlign:'top', padding:'10px'}}>
                        //             <li class="cat-task_li_li">
                        //                 <span class="span-user-left" style={{backgroundColor: 'orange'}}  onClick={(e) =>this.handleClick(e,task)}> Priority: {task.priority}</span>
                        //             </li>
                        //             <li class="cat-task_li_li">
                        //                 <span class="span-user-left"  style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} onClick={(e) =>this.handleClick(e,task)}> Status: {task.status}</span>
                        //             </li>
                        //             <li>
                        //                 <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> Assigned To: {this.state.username}</span>
                        //             </li>
                        //         </ul>
                        //     </div>

                        // <Col > 
                        // <Row xs="6" sm="4">
                        // <Card body inverse color="white">
                        //     <CardHeader className="text-center"><small className="text-muted">{task.StatusName}</small></CardHeader>
                        //     <CardBody className="text-center">
                        //         <CardTitle><capital className="text-muted">{task.taskName}</capital></CardTitle>
                        //         <CardText>
                        //         <capital className="text-muted">{task.taskInfo}</capital> </CardText>
                        //         <CardText>
                        //             <small className="text-muted">Priority {task.priority}</small>
                        //         </CardText>
                        //         <Button color="secondary">Update</Button>
                        //     </CardBody>
                        //     <CardFooter className="text-center">Assigned to: {this.state.username} </CardFooter>
                        // </Card>
                        // </Row>
                        // </Col>




                        // </li>
                        // )}
                        // {/* </ul> */ }
                        //  </div>
                    // }</div>}


            //     {/* <div class="add_task"> */}
            //     {!this.props.updateTask && <div>
            //         <form onSubmit={this.handleSubmit}>
            //             {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
            //             <button id="add-task-button" type="submit">Add Task</button>
            //         </form>
            //     </div>}

            // </div>
        );
    }
}

export default connect(mapStateToProps)(Task);