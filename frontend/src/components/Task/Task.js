import React from "react";
import { connect } from 'react-redux';
import { getTasksUsers } from '../../socket/taskSocket';
//mport {userId} from '../../socket/userSocket';
import TaskUpdate from './taskUpdate';
import '../../css/projectTask.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    updateTask: state.task.updateTask
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

    componentDidMount() {
        //getMessage();
        console.log(this.state.userId);
        getTasksUsers(this.state.userId, (err, data) => {
            //console.log('inside getTaskUsers in ../src/components/Task/Task.js')
            //console.log(data);

            // data.forEach(elt => {
            //     elt.isadd = 'false'
            //     elt.color = "rgb(155, 121, 156)";
            // })
            console.log(data);
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
                                    marginTop: '8px', marginBottom: '8px', height: "auto", padding: "5px" }}>
                                    <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> {task.taskName}</span>
                                    <ul style={{verticalAlign:'top', padding:'10px'}}>
                                        <li class="cat-task_li_li">
                                            <span class="span-user-left" style={{backgroundColor: 'orange'}}  onClick={(e) =>this.handleClick(e,task)}> Priority: {task.priorityID}</span>
                                        </li>
                                        <li class="cat-task_li_li">
                                            <span class="span-user-left"  style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} onClick={(e) =>this.handleClick(e,task)}> Status: {task.statusID}</span>
                                        </li>
                                        <li>
                                            <span class="span-user-left"  onClick={(e) =>this.handleClick(e,task)}> Assigned To: {this.state.username}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                }

                {/* <div class="add_task"> */}
                {!this.props.updateTask &&<div>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                        <button id="add-task-button" type="submit">Add Task</button>
                    </form>
                </div>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Task);