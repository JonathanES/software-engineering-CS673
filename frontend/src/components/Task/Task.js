import React from "react";
import { connect } from 'react-redux';
import { getTasksUsers } from '../../socket/taskSocket';
//import {userId} from '../../socket/userSocket';
import TaskUpdate from './taskUpdate';
import '../../css/projectTask.css'

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
            newtask: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidUpdate(prevProps){

        if (prevProps.task.taskName != this.props.task.taskName){
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({getListofTasksForUser: getListofTasksForUser});
        }

        if (prevProps.task.dueDate != this.props.task.dueDate){
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({getListofTasksForUser: getListofTasksForUser});
        }

        if (prevProps.task.taskInfo != this.props.task.taskInfo){
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({getListofTasksForUser: getListofTasksForUser});
        }

        if (prevProps.task.statusID != this.props.task.statusID){
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({getListofTasksForUser: getListofTasksForUser});
        }

        if (prevProps.task.actualTimeSpent != this.props.task.actualTimeSpent){
            const getListofTasksForUser = this.state.getListofTasksForUser;
            getListofTasksForUser.forEach(task => {
                if (task.taskID == this.props.task.taskID)
                    task = this.props.task;
            })
            this.setState({getListofTasksForUser: getListofTasksForUser});
        }

        if (prevProps.task.isDeleted != this.props.task.isDeleted ){

            let listOfTask = this.state.getListofTasksForUser;
            listOfTask = listOfTask.filter(task => task.taskID != this.props.task.taskID);
            this.setState({getListofTasksForUser: listOfTask})

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

    handleClick(e,task){
        console.log('Calling Task Update');
        this.props.dispatch({type:'USER_UPDATE_TASK_DEMAND', task:task});
    }


    render() {
        return (
            <div>
                {this.props.updateTask && <TaskUpdate dispatch={this.props.dispatch} />}
                {!this.props.updateTask && <div class="direct">
                    <div class="title uppercase" style={{marginBottom:'10px'}}>{this.props.username}'s Tasks</div>
                    <ul style={{display: 'block'}}>
                        {this.state.getListofTasksForUser.map(task =>
                            <li style={{ width: '300px', height: "auto",
                            paddingBlock:'10px', verticalAlign:'top',
                            margin:'2px 2px 2px 2px' , borderRadius: '5px',
                            backgroundColor: "#e6e6e6", position: "relative" ,
                            display: 'inline-block'}}>
                                <div id={task.taskName} onClick={(e) =>this.handleClick(e,task)}>
                                </div>
                                <div class="user-task" style={{ width: '94%', height: '200px',
                                    borderRadius: '5px', marginLeft: '3%', display:'block',
                                    marginTop: '8px', marginBottom: '8px', padding: "5px" }}>
                                    <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> {task.taskName}</span>
                                    {/* <ul style={{verticalAlign:'top', padding:'10px'}}>
                                        <li class="cat-task_li_li">
                                            <span class="span-user-left" style={{backgroundColor: 'orange'}}  onClick={(e) =>this.handleClick(e,task)}> Priority: {task.priority}</span>
                                        </li>
                                        <li class="cat-task_li_li">
                                            <span class="span-user-left"  style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} onClick={(e) =>this.handleClick(e,task)}> Status: {task.status}</span>
                                        </li>
                                        <li>
                                            <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> Assigned To: {this.state.username}</span>
                                        </li>
                                    </ul> */}
                                    <div class="cat-task_li_li" style={{verticalAlign:'top', padding:'10px'}}>
                                        <div class="cat-task_li_li">
                                            <span class="span-user-left" style={{backgroundColor: 'orange'}}  onClick={(e) =>this.handleClick(e,task)}> Priority: {task.priority}</span>
                                        </div>
                                        <div class="cat-task_li_li">
                                            <span class="span-user-left"  style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} onClick={(e) =>this.handleClick(e,task)}> Status: {task.status}</span>
                                        </div>
                                        <div class="cat-task_li_li">
                                            <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> Assigned To: {this.state.username}</span>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                }

                {/* <div class="add_task"> */}
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
