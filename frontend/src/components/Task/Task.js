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
                            <li style={{ width: '300px', minHeight: "250px", 
                            paddingBlock:'10px', verticalAlign:'top', 
                            margin:'2px 2px 2px 2px' , borderRadius: '5px', 
                            position: "relative" , 
                            display: 'inline-block'}}>
                                <div id={task.taskName} onClick={(e) =>this.handleClick(e,task)}>
                                </div>
                                <div class="user-task" style={{ width: '94%', minHeight: '250px', 
                                    borderRadius: '5px', marginLeft: '3%', display:'block', 
                                    marginTop: '8px', marginBottom: '8px', height: "auto", padding: "5px",border:'0px' }}>
                                    <span class="span-user-left" style={{color:'3b3b3b',textOverflow:'eclipse',whiteSpace:'nowrap',fontWeight:'bold'}}   onClick={(e) =>this.handleClick(e,task)}> {task.taskName}</span>
                                    <ul style={{verticalAlign:'top', padding:'10px',background:'white',width:'94%',minHeight:'100px',display:'block',marginLeft:'3%',borderRadius:'4px',marginTop:'10px'}}>
                                        <li class="cat-task_li_li">
                                            <span class="span-user-left" style={{backgroundColor: 'gold',color:'#fff',width:'120px',height:'30px',borderRadius:'5px',display:'block',textAlign:'center',lineHeight:'30px'}}  onClick={(e) =>this.handleClick(e,task)}> Priority: {task.priority}</span>
                                        </li>
                                        <li class="cat-task_li_li">
                                            <span class="span-user-left"  style={{ display: this.state.modalIsOpen, minWidth: "50px", height: "20px",display:'block',color:'black',marginTop:'20px' }} onClick={(e) =>this.handleClick(e,task)}> <span style={{backgroundColor: 'LightCoral',color:'#fff',width:'80px',height:'30px',borderRadius:'5px',display:'block',textAlign:'center',lineHeight:'30px',float:'left',marginRight:'10px'}}>Status:</span> {task.status}</span>
                                        </li>
                                        <li>
                                            <span class="span-user-left" style={{display:'block',color:'black',height:'20px',marginTop:'20px',marginBottom:'20px'}}  onClick={(e) =>this.handleClick(e,task)}> <span style={{backgroundColor: 'MediumPurple',color:'#fff',width:'120px',height:'30px',borderRadius:'5px',display:'block',textAlign:'center',lineHeight:'30px',float:'left',marginRight:'10px'}}>Assigned To:</span> {this.state.username}</span>
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