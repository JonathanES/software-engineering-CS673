import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getPriorities, getStatus } from "../../socket/projectSocket";
import {
  updateTaskName,
  updateDueDate,
  updatePriorityID,
  updateTaskInfo,
  updateStatusID,
  updateActTime,
  deleteTask
} from "../../socket/taskSocket";
import { getUserPrev } from "../../socket/taskSocket";
import { tsAnyKeyword } from "@babel/types";


//import '../../css/projectUpdate.css'

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  project: state.project.project,
  projectName: state.project.projectName,
  task: state.task.task
  //isProjectSelected: state.project.isProjectSelected
  //taskname: state.Task.newtask
});

class TaskUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      pID: props.project.projectID,
      taskID: props.task.taskID,

      taskPriorities: [],
      taskStatus: [],
      taskName: props.task.taskName,
      dueDate: props.task.dueDate,
      priorityID: props.task.priorityID,
      priority: props.task.priority,
      taskInfo: props.task.taskInfo,
      status: props.task.status,
      statusID: props.task.statusID,
      assignedTo: props.task.userID,
      expDuration: props.task.expectedDuration,
      actTime: props.task.actualTimeSpent,
      comments: []
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
  }

  componentDidMount() {
    console.log("tasks:", this.props.task);

    getPriorities((err, data) => {
      this.setState({ taskPriorities: data });
      // console.log(data);
      //this.state.taskPriorities.push({PriorityID:0,Priority:'Please Select One'});
    });

    getStatus((err, data) => {
      this.setState({ taskStatus: data });
      //console.log(data);
      //this.state.taskStatus.push({StatusID:4,StatusName:'Please Select One'});
    });
  }

  handleNameChange(newName) {
    this.setState({ taskName: newName });
  }

  handleDateChange(newDate) {
    this.setState({ dueDate: newDate });
  }

  handlePriorityChange(e) {
    let selval = parseInt(e.target.value);
    console.log("Priority Selected:", selval);
    //console.log(this.state.taskPriorities);
    console.log("Priority Change:", selval);
    console.log(
      "Priority Name:",
      this.state.taskPriorities[selval - 1].Priority
    );

    if (selval != "") {
      this.setState({ priorityID: selval });
      this.setState({
        priority: this.state.taskPriorities[selval - 1].Priority
      });
    }
  }

  handleStatusChange(event) {
    let selval = parseInt(event.target.value);
    console.log("Status Selected:", selval);
    console.log("Status Change:", selval);
    //console.log(this.state.taskStatus);
    console.log("Status Name:", this.state.taskStatus[selval - 1].StatusName);
    if (selval != "") {
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

  handleClick(event) {}

  handleChangeUser(event) {}

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

    if (
      this.state.taskName != this.props.task.taskName &&
      this.state.taskName != ""
    ) {
      // console.log(this.props.task.taskID);
      // console.log(this.state.taskName);
      updateTaskName(
        this.props.task.taskID,
        this.state.taskName,
        (err, data) => {
          console.log("New Task Name:", data);
          const task = this.props.task;
          task.taskName = data;
          this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
        }
      );
    }

    if (
      this.state.dueDate != this.props.task.dueDate &&
      this.state.dueDate != ""
    ) {
      // console.log(this.props.task.taskID);
      // console.log(this.state.dueDate);
      updateDueDate(this.props.task.taskID, this.state.dueDate, (err, data) => {
        console.log("New Due Date:", data);
        const task = this.props.task;
        task.dueDate = data;
        this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
      });
    }

    if (
      this.state.priorityID != this.props.task.priorityID &&
      this.state.priorityID != ""
    ) {
      // console.log(this.state.priorityID);
      updatePriorityID(
        this.props.task.taskID,
        this.state.priorityID,
        (err, data) => {
          console.log("New Priority:", data);
          const task = this.props.task;
          task.priorityID = data;
          task.priority = this.state.priority;
          this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
        }
      );
    }

    if (
      this.state.taskInfo != this.props.task.taskInfo &&
      this.state.taskInfo != ""
    ) {
      // console.log(this.state.taskInfo);
      updateTaskInfo(
        this.props.task.taskID,
        this.state.taskInfo,
        (err, data) => {
          console.log("New Task Info:", data);
          const task = this.props.task;
          task.taskInfo = data;
          this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
        }
      );
    }

    if (
      this.state.statusID != this.props.task.statusID &&
      this.state.statusID != ""
    ) {
      // console.log(this.state.statusID);
      updateStatusID(
        this.props.task.taskID,
        this.state.statusID,
        (err, data) => {
          // console.log('New Task Info:', data);
          const task = this.props.task;
          task.statusID = data;
          task.status = this.state.status;
          this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
        }
      );
    }

    if (
      this.state.actTime != this.props.task.actualTimeSpent &&
      this.state.actTime != ""
    ) {
      console.log(this.state.actTime);
      updateActTime(this.props.task.taskID, this.state.actTime, (err, data) => {
        // console.log('New Task Info:', data);
        const task = this.props.task;
        task.actualTimeSpent = data;
        this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
      });
    }
  }

  handleDeleteTask(e) {
    deleteTask(this.props.task.taskID, 1, (err, data) => {
      console.log("Deleted:", data);
      const task = this.props.task;
      task.isDeleted = 1;
      this.props.dispatch({ type: "USER_UPDATE_TASK_DEMAND", task: task });
      //this.props.dispatch({type:'USER_TASK_DEMAND'});
    });
  }

  render() {
    return (
      // <div sytle={{backgroundColor:'black'}}>
      <div
        style={{
          backgroundColor: "white",
          borderradius: "8px 14px 14px 54px",
          mozborderradius: "8px 14px 14px 54px",
          webkitborderradius: "8px 14px 14px 54px",
          border: "13px solid #ebf1f5",
          paddingLeft: "10%",
          width:'60%'
        }}
      >
        <div style={{ color: "black", padding: "20px" }}>
          <div
            style={{
              backgroundcolor: "white",
              color: "black",
              padding: "20px"
            }}
          />
          <button
            type="button"
            class="close"
            onClick={e => {
              this.props.dispatch({
                type: "USER_UPDATE_TASK_DEMAND",
                task: this.props.task
              });
              e.preventDefault();
            }}
          />
          <h4
            style={{
              backgroundcolor: "white",
              color: "black",
              padding: "20px"
            }}
          >
            Update Task Information
          </h4>
        </div>
        <div style={{ backgroundcolor: "white" }}>
          <label for="taskName">Task Name:</label>
          <input
            type="string"
            id="taskName"
            style={{ textAlign: "center", marginLeft:"20px" }}
            value={this.state.taskName}
            onChange={e => this.handleNameChange(e.target.value)}
          />
        </div>
        <div style={{ backgroundcolor: "white" }}>
          <label for="dueDate">Due Date:</label>
          <br />
          <input
            type="date"
            id="dueDate"
            style={{ textAlign: "center", width:'250px' }}
            className="trip-start"
            value={moment(this.state.dueDate).format("YYYY-MM-DD")}
            min="2019-06-01"
            max="2030-12-31"
            onChange={e => this.handleDateChange(e.target.value)}
          />
        </div>
        <div className="taskform-field" style={{ backgroundcolor: "white" }}>
          <label For="prioritylevelSelection">Priority of the Task:</label>
          <br />
          <select
            value={this.state.priorityID}
            onChange={e => this.handlePriorityChange(e)}
          >
            {this.state.taskPriorities.map(tp => (
              <option value={tp.PriorityID} style={{ textAlign: "center" }}>
                {" "}
                {tp.Priority}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="taskform-field" style={{ backgroundcolor: "white" }}>
          <label For="statuslevelSelection">Status of the Task:</label>
          <br />
          <select
            value={this.state.statusID}
            onChange={e => this.handleStatusChange(e)}
          >
            {this.state.taskStatus.map(ts => (
              <option className={ts.StatusName} value={ts.StatusID}>
                {ts.StatusName}
              </option>
            ))}
          </select>
        </div>
        <div style={{ backgroundcolor: "white" }}>
          <label for="taskInfoName">Task Information:</label>
          <br />
          <input
            type="string"
            id="taskInfo"
            style={{ textAlign: "center" }}
            value={this.state.taskInfo}
            onChange={e => this.handleInfoChange(e.target.value)}
          />
        </div>
        <div style={{ backgroundcolor: "white" }}>
          <label for="taskExpDur">Expected Time to Finish:</label>
          <br />
          <span type="numer" id="expDur" style={{ textAlign: "center" }}>
            {" "}
            {this.state.expDuration} hours
          </span>
          <div style={{ backgroundcolor: "white" }}>
            <label for="taskActTime">Actual Time Spent on the Task:</label>
            <br />
            <input
              type="numer"
              id="actTime"
              style={{ textAlign: "center" }}
              value={this.state.actTime}
              onChange={e => this.handleActTimeChange(e.target.value)}
            />
            <div
              class="modal-footer"
              style={{ marginBottom: "20px" }}
              style={{ backgroundColor: "white" }}
              style={{ marginTop: "25px" }}
              style={{ borderTop: "none" }}
            >
              <br />
              <br />
              <button
                class="btn btn-default bg-primary"
                style={{ left: "100px", width: "140px" }}
                id="add-cat-button"
                type="Click"
                onClick={e => this.handleUpdateTask(e)}
              >
                Update Task
              </button>
              <button
                type="submit"
                class="btn btn-default bg-primary"
                data-dismiss="modal"
                style={{ left: "300px", width: "140px" }}
                onClick={e => {
                  if (
                    window.confirm("Are you sure you wish to delete this Task?")
                  )
                    this.handleDeleteTask(e);
                }}
              >
                Delete Task
              </button>

              <button
                type="submit"
                class="btn btn-default bg-primary"
                data-dismiss="modal"
                style={{ left: "500px", width: "140px" }}
                onClick={e => {
                  this.props.dispatch({
                    type: "USER_UPDATE_TASK_DEMAND",
                    task: this.props.task
                  });
                  e.preventDefault();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(TaskUpdate);
