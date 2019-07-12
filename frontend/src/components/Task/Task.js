import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addTask, getTasksUsers } from '../../socket/taskSocket';
import TaskForm from '../task-design/TaskForm';
//mport {userId} from '../../socket/userSocket';
import '../../css/task.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    //taskname: state.Task.newtask
});

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            getListofTasksForUser : [],
            newtask: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        //getMessage();
        getTasksUsers(this.state.userId, (err, data) => {
            console.log('inside getTaskUsers in ../src/components/Task/Task.js')
            //console.log(data);

            // data.forEach(elt => {
            //     elt.isadd = 'false'
            //     elt.color = "rgb(155, 121, 156)";
            // })
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

    render() {
        return (
            <div>
                <div class="direct">
                    <div class="title">User Tasks</div>
                    <ul>
                        {this.state.getListofTasksForUser.map(task =>
                            <li>
                                <div id={task.taskName} onClick={this.handleClick}>
                                </div>
                                <div class="user-task" >
                                    <span class="span-user-left"> {task.taskName}</span>
                                    <ul>
                                    <li>
                                    <span class="span-user-left"> Priority: {task.priorityID}</span>
                                    </li>
                                    <li>
                                    <span class="span-user-left"> Status: {task.statusID}</span>
                                    </li>
                                    <li>
                                    <span class="span-user-left"> Assigned To: {this.state.username}</span>
                                    </li>
                                    </ul>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* <div class="add_task"> */}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                        <button id="add-task-button" class ="addTaskFormBtn" type="submit">Add Task</button>
                        {this.props.addTask && <TaskForm  dispatch={this.props.dispatch}/>}
                        {/* <input id="add-task-button" class="addTaskFormBtn" type="submit" onClick={() => this.props.dispatch({ type: 'USER_ADD_GROUP_DEMAND' })} /> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Task);