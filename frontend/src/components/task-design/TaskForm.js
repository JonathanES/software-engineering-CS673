import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { addTask, getTask } from "../../socket/taskSocket";
import {
  showCategories_old,
  getPriorities,
  getAvailableUsersForProject
} from "../../socket/projectSocket";
import "../../css/taskForm.css";


const mapStateToProps = state => ({
  userId: state.user.userId,
  username: state.user.username,
  category: state.project.category,
  projectID: state.project.projectID,
  project: state.project.project,

  projectCategoryList: state.project.projectCategoryList,
  projectName: state.project.projectName,
  taskDate: state.project.taskDate
  //addTask: state.message.addTask
});

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      username: props.username,
      parentID: 1,
      categoryID: props.category.CategoryID,
      categoryName: props.category.CategoryName,
      projectName: props.projectName,
      pID: props.pID,
      priorityID: "",
      taskName: "",
      taskInfo: "",
      expDuration: "",
      taskPriorities: [],
      newTask: {},


      listOfFriends: [],
      newusername: "",
      newuserid: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  componentDidMount() {
    getPriorities((err, data) => {
      this.setState({ taskPriorities: data });
      //console.log(data);
      this.state.taskPriorities.push({
        PriorityID: 4,
        Priority: "Please Select One"
      });
      //console.log(this.state.taskPriorities);
      //console.log('User levels:',this.state.userlevels);
    });

    getAvailableUsersForProject(
      this.props.projectID,
      (err, data) => {
        data.push({ UserID: 0, username: "Please Select a User" });
        //console.log(data);
        this.setState({ listOfFriends: data });
        //console.log(this.state.listOfFriends);
      }
    );
  }
  handleClick(event) {}

  handleNewUser(e) {
    const friend = JSON.parse(e.target.value);
    //friend.preventDefault();
    //console.log('User ID:',event.target.value);
    this.setState({ newuserid: friend.UserID });
    this.setState({ newusername: friend.username });
    //console.log(this.state.newusername);
    //console.log(this.state.newuserid);
    //event.preventDefault();
  }

  handlePriorityChange(event) {
    //console.log("User Type:", event.target.value);
    //console.log("User Type:", event.target.selectedIndex);
    this.setState({ priorityID: event.target.value });
    event.preventDefault();
  }

  handleChange(event) {
    switch (event.target.id) {
      case "taskName":
          this.setState({ taskName: event.target.value });
          break;
      case "priorityID":
        this.setState({ priorityID: event.target.value });
        break;
      case "taskInfo":
        this.setState({ taskInfo: event.target.value });
        break;
      case "expDuration":
        //console.log(typeof (parseInt(event.target.value)));
        if (typeof parseInt(event.target.value) == "number") {
          this.setState({ expDuration: event.target.value });
        }
        break;
      case "dueDate2":
        //console.log('New date:', event.target.value);
        this.setState({ dueDate: event.target.value });
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    // console.log('After clicking add project button');
    // console.log('Handle Submit: userID', this.state.userId);
    // console.log('Category ID:', this.state.categoryID);
    // console.log('TaskName:', this.state.taskName);
    // console.log('ParentID:', this.state.categoryID);
    // console.log('CategoryID:', this.state.categoryID);
    // console.log('UserID:', this.state.userId);
    // console.log('Some Variable:', 0);
    // console.log('PriorityID:', this.state.priorityID);
    // console.log('TaskName:', this.state.taskName)
    // console.log('Task Info:', this.state.taskInfo);
    // console.log('Exp Duration:', this.state.expDuration);
    // console.log('Actual Time Spent:', 0);

    if (this.state.taskName == "") {
      alert("Please check your input, Task Name cannot be empty");
    } else if (this.state.priorityID == "") {
      alert("Please select the task's priority");
    } else if (this.state.expDuration == "") {
      alert("Please enter an expected duration to complete this task");
    } else if (this.state.deuDate == "") {
      alert("Please enter a due date to complete this task");
    } else {
      //here we should call the mainpage, so they can see the project added to their screen, wonder how we will do it
      //this.props.dispatch({ type: 'USER_LOGIN', username: data.username});
      // console.log("Project ID:", this.props.projectCategoryList[0].ProjectID);
      // console.log("projectCategoryList:", this.props.projectCategoryList);
      // console.log("ProjectName:", this.props.projectName);
      // console.log("this.state.userid:", this.state.userId);
      // console.log("this.state.username:", this.state.username);
      // console.log("category ID:", this.state.categoryID);
      // console.log("category name:", this.state.categoryName);
      // console.log("newusername:", this.state.newusername);
      // console.log("newuserid:", this.state.newuserid);

      if (this.state.newuserid != 0) {
        addTask(
          1,
          this.state.categoryID,
          this.state.newuserid,
          1,
          this.state.priorityID,
          this.state.taskName,
          this.state.taskInfo,
          this.state.dueDate,
          this.state.expDuration,
          0,
          async (err, data) => {

            showCategories_old(this.props.projectID, (err, data) => {
              this.props.dispatch({
                type: "USER_IS_PROJECTTASK_DEMAND",
                project: this.props.project,
                projectCategoryList: data.length > 0 ? data : []
              });
            });
          }
        );

      } else {
        addTask(
          1,
          this.state.categoryID,
          this.props.userId,
          1,
          this.state.priorityID,
          this.state.taskName,
          this.state.taskInfo,
          this.state.dueDate,
          this.state.expDuration,
          0,
          async (err, data) => {

            showCategories_old(this.props.projectID, (err, data) => {
              this.props.dispatch({
                type: "USER_IS_PROJECTTASK_DEMAND",
                project: this.props.project,
                projectCategoryList: data.length > 0 ? data : []
              });
            });
          }
        );
      }

    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="taskform">
        <h4>
          {" "}
          Add a new Task for Project {this.props.projectName} under{" "}
          {this.props.category.CategoryName} category
        </h4>
        <br/>
        
        <div className="taskform-contain">
          
            <div className="taskform-field">
              <div className="taskForm-row">
              <label>Task Name:</label>
              <input
                id="taskName"
                type="text"
                value={this.state.taskName}
                onChange={this.handleChange}
              />
              </div>
        
              <br />
              <div className="taskform-field">
              <label>Priority of the Task:</label>
              <select onChange={e => this.handlePriorityChange(e)}>
                {this.state.taskPriorities.map(tp => (
                  <option selected={tp.PriorityID} key={"taskFormPriority"+tp.PriorityID} value={tp.PriorityID}>
                    {" "}
                    {tp.Priority}{" "}
                  </option>
                ))}
              </select>
              </div>
        
              <br />
              <div className="taskform-field"></div>
              <label>TaskInfo:</label>
              <input
                id="taskInfo"
                type="text"
                value={this.state.taskInfo}
                onChange={this.handleChange}
              />
              </div>
      
              <br />
              <div className="taskform-field">
              <label>Due Date:</label>
              <input type="date" id="dueDate2" value={this.state.dueDate} min="2019-06-01" max="2030-12-31" onChange={this.handleChange} />
              </div>
       
              <br />
              <div className="taskform-field">
              <label>Expected Time to Complete:</label>
              <input id="expDuration" type="number" value={this.state.expDuration} onChange={this.handleChange} />
              <span> hours</span>
              </div>
      
              <br />
              <div className="taskform-field">
              <label>Assign to user:</label>
              <select onChange={this.handleNewUser}>
                {this.state.listOfFriends.map(friend => (

                  <option selected= {friend.username} key={"taskFormusername"+friend.UserID} className={friend.username} value={JSON.stringify(friend)}>{""}{friend.username}{""}</option>
                ))}
              </select>
              </div>
              <br/>
              <form onSubmit={this.handleSubmit}>
              <button id="add_task_form" type="submit" className="taskformbtn uppercase">
                Add Task
              </button>
              
          </form>
          {/* <p className="account-help">You already have an account ? <a onClick={this.handleClick} className="underline red" >Login</a></p> */}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(TaskForm);
