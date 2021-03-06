import React from "react";
import { connect } from 'react-redux';
import { getTasksUsers } from '../../socket/taskSocket';
//import {userId} from '../../socket/userSocket';
import TaskUpdate from './taskUpdate';
import '../../css/projectTask.css'
import moment from 'moment'

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

        this.state = {
            userId: props.userId,
            username: props.username,
            getListofTasksForUser: [],
            newtask: '',
            orderValue: 'category-order'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);

    }

    componentDidUpdate(prevProps) {

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

    componentDidMount() {

        getTasksUsers(this.state.userId, (err, data) => {
            this.setState({ getListofTasksForUser: data });
        });
    }

    handleChange(event) {
        this.setState({ newtask: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handleSubmit(event) {
        // console.log('Add Task button pressed before call');

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
        // console.log('Calling Task Update');
        this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
    }

    handleOrderChange(event) {
        const order = event.target.value;
        let listOfTask = this.state.getListofTasksForUser;
        this.setState({ orderValue: order });
        switch (order) {
            case "category-order":
                listOfTask = listOfTask.sort((x, y) => { return x.categoryID - y.categoryID });
                this.setState({ getListofTasksForUser: listOfTask });
                break;
            case "priority-order":
                listOfTask = listOfTask.sort((x, y) => { return y.priorityID - x.priorityID });
                this.setState({ getListofTasksForUser: listOfTask });
                break;
            case "date-order":
                listOfTask = listOfTask.sort((x, y) => { return new Date(x.dueDate) - new Date(y.dueDate) });
                this.setState({ getListofTasksForUser: listOfTask });
                break;
            default:
                break;
        }

    }

    render() {
        return (
            <div id="task-container">
                {this.props.updateTask && <TaskUpdate dispatch={this.props.dispatch} />}
                {!this.props.updateTask && <div className="direct">

                    <div className="title uppercase" style={{ marginBottom: '10px', color: 'black', fontWeight: 'bold' }}>
                        {this.props.username}'s Tasks
                        <select value={this.state.orderValue} onChange={this.handleOrderChange}>
                            <option value="category-order">Order by category</option>
                            <option value="priority-order">Order by priority</option>
                            <option value="date-order">Order by date</option>
                        </select>
                    </div>

                    <ul style={{ display: 'block' }}>
                        {this.state.getListofTasksForUser.map(task =>
                            <li key={"Taskjs" + task.taskID} style={{
                                width: '300px', height: "auto",
                                paddingBlock: '10px', verticalAlign: 'top',
                                position: "relative",
                                display: 'inline-block'
                            }}>
                                <div id={task.taskName} onClick={(e) => this.handleClick(e, task)}>
                                </div>
                                <div className="user-task" style={{
                                    width: '94%', height: '200px',
                                    borderRadius: '5px', marginLeft: '3%', backgroundColor: 'white', display: 'block',
                                    marginTop: '8px', marginBottom: '8px', padding: "5px"
                                }}>
                                    <span className="span-user-left" onClick={(e) => this.handleClick(e, task)}> {task.taskName}</span>
                                    {/* <ul style={{verticalAlign:'top', padding:'10px'}}>
                                        <li className="cat-task_li_li">
                                            <span className="span-user-left" style={{backgroundColor: 'orange'}}  onClick={(e) =>this.handleClick(e,task)}> Priority: {task.priority}</span>
                                        </li>
                                        <li className="cat-task_li_li">
                                            <span className="span-user-left"  style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} onClick={(e) =>this.handleClick(e,task)}> Status: {task.status}</span>
                                        </li>
                                        <li>
                                            <span className="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> Assigned To: {this.state.username}</span>
                                        </li>
                                    </ul> */}
                                    <div className="cat-task_li_li" style={{ verticalAlign: 'top', padding: '10px' }}>
                                        <div className="cat-task_li_li">
                                            <span className="span-user-left" onClick={(e) => this.handleClick(e, task)} style={{ fontStyle: 'bold' }}> Project: {task.projectName}</span>
                                        </div>
                                        <div className="cat-task_li_li">
                                            <span className="span-user-left" onClick={(e) => this.handleClick(e, task)}> Category: {task.categoryName}</span>
                                        </div>
                                        <div className="cat-task_li_li">
                                            <span className="span-user-left" style={{ backgroundColor: 'orange', background: task.priority == "High" ? "red" : "orange" }} onClick={(e) => this.handleClick(e, task)}> Priority: {task.priority}</span>
                                        </div>
                                        <div className="cat-task_li_li">
                                            <span className="span-user-left" style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} onClick={(e) => this.handleClick(e, task)}> Status: {task.status}</span>
                                        </div>
                                        <div className="cat-task_li_li">
                                            <span className="span-user-left" onClick={(e) => this.handleClick(e, task)}> Assigned To: {this.state.username}</span>
                                        </div>
                                        <div className="cat-task_li_li">
                                            <span className="span-user-left" onClick={(e) => this.handleClick(e, task)}> Assigned To: {moment(task.dueDate).format('DD-MM-YY')}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                }
                {/* <div className="add_task"> */}
                {/* {!this.props.updateTask &&<div>
                    <form onSubmit={this.handleSubmit}>
                        <button id="add-task-button" type="submit">Add Task</button>
                    </form>
                </div>} */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Task);
