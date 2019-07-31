import React from "react";
import { connect } from 'react-redux';
import moment from 'moment'

import { getPriorities, getStatus } from '../../socket/projectSocket';
import { updateTaskName, updateDueDate, updatePriorityID, updateTaskInfo, updateStatusID, updateActTime, deleteTask } from '../../socket/taskSocket';
import { showCategories_old } from '../../socket/projectSocket';

//import '../../css/projectUpdate.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    project: state.project.project,
    projectName: state.project.projectName,
    task: state.project.taskToUpdate,
    //isProjectSelected: state.project.isProjectSelected
    //taskname: state.Task.newtask
});


class ProjectTaskUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            project: props.project,
            pID: props.project.projectID,
            taskID: props.task.TaskID,

            taskPriorities: [],
            taskStatus: [],
            taskName: props.task.TaskName,
            dueDate: props.task.DueDate,
            priorityID: props.task.PriorityID,
            priority: props.task.Priority,
            taskInfo: props.task.TaskInfo,
            status: props.task.Status,
            statusID: props.task.StatusID,
            assignedTo: props.task.UserID,
            expDuration: props.task.ExpectedDuration,
            actTime: props.task.ActualTimeSpent,
            comments: [],

        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.handleActTimeChange = this.handleActTimeChange.bind(this);

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleClosebtn = this.handleClosebtn.bind(this);

    }

    componentDidMount() {

        console.log('tasks:', this.props.task);

        getPriorities((err, data) => {
            this.setState({ taskPriorities: data })
            // console.log(data);
            //this.state.taskPriorities.push({PriorityID:0,Priority:'Please Select One'});
        })

        getStatus((err, data) => {
            this.setState({ taskStatus: data });
            //console.log(data);
            //this.state.taskStatus.push({StatusID:4,StatusName:'Please Select One'});
        })
    }

    handleNameChange(newName) {
        this.setState({ taskName: newName });
    }

    handleDateChange(newDate) {
        this.setState({ dueDate: newDate });
    }

    handlePriorityChange(e) {
        let selval = parseInt(e.target.value);
        console.log('Priority Selected:', selval);
        //console.log(this.state.taskPriorities);
        console.log('Priority Change:', selval);
        console.log('Priority Name:', this.state.taskPriorities[selval - 1].Priority)



        if (selval != '') {
            this.setState({ priorityID: selval });
            this.setState({ priority: this.state.taskPriorities[selval - 1].Priority });
        }
    }

    handleStatusChange(event) {
        let selval = parseInt(event.target.value);
        console.log('Status Selected:', selval)
        console.log('Status Change:', selval);
        //console.log(this.state.taskStatus);
        console.log('Status Name:', this.state.taskStatus[selval - 1].StatusName)
        if (selval != '') {
            this.setState({ statusID: selval });
            this.setState({ status: this.state.taskStatus[selval - 1].StatusName });
        }
        event.preventDefault();
    }

    handleInfoChange(newInfo) {
        this.setState({ taskInfo: newInfo });
    }

    handleActTimeChange(newTime) {
        this.setState({ actTime: newTime });
    }

    handleClick(event) {
    }

    handleChangeUser(event) {
    }



    handleNewUser(event) {

        // //console.log('User ID:',event.target.value);
        // this.setState({newuserid: event.target.value}); 
        // event.preventDefault();
    }

    handleUpdateTask(e) {

        // console.log('taskName:', this.state.taskName);
        // console.log('dueDate:', this.state.dueDate);
        // console.log('priority:', this.state.priorityID);
        // console.log('taskInfo:', this.state.taskInfo);
        // console.log('statusID:', this.state.statusID);
        // console.log('assignedTo:', this.state.assignedTo)
        // console.log('expDuration:', this.state.expDuration);
        // console.log('actTime:', this.state.actTime);
        e.preventDefault();

        if (this.state.taskName != this.props.task.TaskName && this.state.taskName != '') {
            // console.log(this.props.task.taskID);
            // console.log(this.state.taskName);
            updateTaskName(this.props.task.TaskID, this.state.taskName, (err, data) => {
                console.log('New Task Name:', data);
                const task = this.props.task;
                task.taskName = data;
                this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            });
        }

        if (this.state.dueDate != this.props.task.DueDate && this.state.dueDate != '') {
            // console.log(this.props.task.taskID);
            // console.log(this.state.dueDate);
            updateDueDate(this.props.task.TaskID, this.state.dueDate, (err, data) => {
                console.log('New Due Date:', data);
                const task = this.props.task;
                task.dueDate = data;
                this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            });
        }

        if (this.state.priorityID != this.props.task.PriorityID && this.state.priorityID != '') {
            // console.log(this.state.priorityID);
            updatePriorityID(this.props.task.TaskID, this.state.priorityID, (err, data) => {
                console.log('New Priority:', data);
                const task = this.props.task;
                task.priorityID = data;
                task.priority = this.state.priority
                this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            });
        }

        if (this.state.taskInfo != this.props.task.TaskInfo && this.state.taskInfo != '') {
            // console.log(this.state.taskInfo);
            updateTaskInfo(this.props.task.TaskID, this.state.taskInfo, (err, data) => {
                console.log('New Task Info:', data);
                const task = this.props.task;
                task.taskInfo = data;
                this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            });
        }

        if (this.state.statusID != this.props.task.StatusID && this.state.statusID != '') {
            // console.log(this.state.statusID);
            updateStatusID(this.props.task.TaskID, this.state.statusID, (err, data) => {
                // console.log('New Task Info:', data);
                const task = this.props.task;
                task.statusID = data;
                task.status = this.state.status;
                this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            });
        }

        if (this.state.actTime != this.props.task.ActualTimeSpent && this.state.actTime != '') {
            console.log(this.state.actTime);
            updateActTime(this.props.task.TaskID, this.state.actTime, (err, data) => {
                // console.log('New Task Info:', data);
                const task = this.props.task;
                task.actualTimeSpent = data;
                this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            });
        }

        showCategories_old(this.props.project.projectID, (err, data) => {
            this.props.dispatch({ type: 'USER_IS_PROJECTTASK_DEMAND', project: this.props.project, projectCategoryList: data.length > 0 ? data : [] });
        })

    }

    handleDeleteTask(e) {

        deleteTask(this.props.task.TaskID, 1, (err, data) => {
            console.log('Deleted:', data);
            const task = this.props.task;
            task.IsDeleted = 1;
            this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
            //this.props.dispatch({type:'USER_TASK_DEMAND'});
            showCategories_old(this.props.project.projectID, (err, data) => {
                this.props.dispatch({ type: 'USER_IS_PROJECTTASK_DEMAND', project: this.props.project, projectCategoryList: data.length > 0 ? data : [] });
            })
        });
        
    }

    handleClosebtn(){

        showCategories_old(this.props.project.projectID, (err, data) => {
            this.props.dispatch({ type: 'USER_IS_PROJECTTASK_DEMAND', project: this.props.project, projectCategoryList: data.length > 0 ? data : [] });
        })
        
    }



    render() {
        return (
            <div className="taskUpdate">
                <div>
                    <h4>Update Task Information</h4>
                </div>
                <div style={{ backgroundcolor: "white" }}>
                    <label htmlFor="taskName">Task Name:</label>
                    <input type="string" id="taskName" defaultValue={this.state.taskName}
                        onChange={e => this.handleNameChange(e.target.value)} />
                </div>
                <br />
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input type="date" id="dueDate3" className="trip-start"
                        value={moment(this.state.dueDate).format("YYYY-MM-DD")}
                        min="2019-06-01"
                        max="2030-12-31"
                        onChange={e => this.handleDateChange(e.target.value)}
                    />
                </div>
                <br />
                <div className="taskform-field">
                    <label htmlFor="prioritylevelSelection">Priority of the Task:</label>
                    <select defaultValue={this.state.priorityID} onChange={e => this.handlePriorityChange(e)} >
                        {this.state.taskPriorities.map(tp => (
                            <option Value={tp.PriorityID} style={{ textAlign: "center" }}>
                                {tp.Priority}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div className="taskform-field">
                    <label htmlFor="statuslevelSelection">Status of the Task:</label>
                    <select defaultValue={this.state.statusID} onChange={e => this.handleStatusChange(e)}>
                        {this.state.taskStatus.map(ts => (
                            <option className={ts.StatusName} value={ts.StatusID}>
                                {ts.StatusName}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div>
                    <label for="taskInfoName">Task Information:</label>
                    <input type="string" id="taskInfo" style={{ textAlign: "center" }}
                        defaultValue={this.state.taskInfo} onChange={e => this.handleInfoChange(e.target.value)} />
                </div>
                <br />
                <div>
                    <label for="taskExpDur">Expected Time to Finish:</label>
                    <span type="numer" id="expDur" style={{ textAlign: "center" }}>
                        {" "}
                        {this.state.expDuration} hours
                </span>
                </div>
                <br />

                <div>
                    <label htmlFor="taskActTime">Actual Time Spent on the Task:</label>
                    <input
                        type="numer"
                        id="actTime"
                        style={{ textAlign: "center" }}
                        value={this.state.actTime}
                        onChange={e => this.handleActTimeChange(e.target.value)}
                    />
                </div>
                <div className="modal-footer">

                    <button id="updateTaskUpdate" type="Click" onClick={e => this.handleUpdateTask(e)} > Update Task
                </button>


                    <button id="deleteTaskUpdate" onClick={e => {
                        if (window.confirm("Are you sure you wish to delete this Task?"))
                            this.handleDeleteTask(e);
                    }}>Delete Task
                </button>

                    <button id="closeTaskUpdate" onClick={e => this.handleClosebtn(e) }>Close
                </button>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(ProjectTaskUpdate);
