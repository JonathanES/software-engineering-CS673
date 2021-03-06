import React from "react";
// import {Moment} from "react-moment"
import moment from "moment";
import { connect } from "react-redux";
import { addCategory } from "../../socket/projectSocket";
import CategoryForm from "../project/categoryform";
import ProjectTaskUpdate from "./projectTaskUpdate";
import "../../css/projectTask.css";
//import "../../css/group-chat.css";

const mapStateToProps = state => ({
  projectID: state.project.projectID,
  projectCategoryList: state.project.projectCategoryList,
  projectName: state.project.projectName,
  isProjectSelected: state.project.isProjectSelected,
  isProjectTasksSelected: state.project.isProjectTasksSelected,
  isUpdateTaskForm: state.project.isUpdateTaskForm,

  addCategory: state.category.addCategory,

  username: state.user.username,
  userId: state.user.userId
  //taskname: state.Task.newtask
});

class ProjectTask extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      userId: props.userId,
      username: props.username,
      listOfTasks: [],
      category: {},
      getListofTasksForUser: [],
      newtask: "",
      catName: "",
      modalIsOpen: ""
    };


    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
  }

  componentDidUpdate(prevProps) {

    if (typeof prevProps.task != 'undefined') {

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

  }
  componentDidMount() {


  }

  handleChange(event) {
    this.setState({ catName: event.target.value });
    //console.log("inside handleChange:" + event.target.value);
  }

  handleMouseOver(e) {
    if (e.target.className == "cat-task_li_li") {
      let child = e.target.childNodes[0].childNodes[1];
      child.style.display = "block";
    }
  }

  handleMouseOut(e) {
    if (
      e.target.className == "cat-task_li_li" ||
      e.target.parentNode.className == "cat-task_li_li"
    ) {
      if (e.target.className == "cat-task_li_li") {
        let child = e.target.childNodes[0].childNodes[1];
        child.style.display = "none";
      } else {
        let child = e.target.parentNode.childNodes[0].childNodes[1];
        child.style.display = "none";
      }
    }
  }
  handleClick(event, catinfo) {
    event.preventDefault();

    //console.log(event);
    //console.log(event.target.id);

    switch (event.target.className) {
      case "add_category_button":
        //console.log('add cat btn pressed');
        if (this.state.catName == "") {
          //console.log('it came here')
          break;
        }
        // console.log(`"Project ID: ${this.props.projectID} Cat Name:  ${this.state.catName});
        addCategory(this.props.projectID, this.state.catName, (err, data) => {
          // console.log("Add Project button pressed");
          this.setState({ catName: "" });
          // console.log("inside handleSubmit");
        });
        break;

      case "add_task_button":
        //console.log('ProjectID:', this.props.projectID);
        //console.log(this.props.projectCategoryList[0].CategoryID);
        //console.log(catinfo)
        //console.log('catID:', event.target.id);
        this.setState({ category: catinfo });
        //console.log('categoryID', this.state.categoryID);
        this.props.dispatch({
          type: "USER_ADD_TASKFORM_DEMAND",
          category: catinfo
        });
        break;

      default:
        // console.log("is this called");
        break;
    }
  }

  handleAddCategory() {
    this.props.dispatch({ type: "USER_ADD_CATEGORY_DEMAND" });
  }

  handleUpdateTask(task) {
    //console.log("why here");
    //console.log(task);
    this.props.dispatch({ type: "USER_PROJECT_TASK_UPDATE", task: task });
  }

  render() {
    return (
      <div style={{ overflowX: "auto" }}>
        {this.props.isProjectTasksSelected && (
          <div className="title" style={{ padding: "5%", alignItems: "top", fontSize: "26px", color: "black" }} >
            {" "}
            You are viewing: {this.props.projectName}
            <a href=" " title="Add Category" style={{ backgroundcolor: "#FFFFFF", color: "#000000", textdecoration: "none" }}>
              <input id="add-button" type="image" style={{ border: 'none' }} src={require("../../images/plus-black.svg")}
                onClick={(e) => { this.props.dispatch({ type: "USER_ADD_CATEGORY_DEMAND" }); e.preventDefault(); }}
              />
            </a>
          </div>
        )}
        {this.props.isProjectTasksSelected && (<div>
          {this.props.addCategory && (
            <CategoryForm dispatch={this.props.dispatch} />
          )}
          <ul style={{ verticalAlign: "top", padding: "10px" }}>
            {/* <ul > */}
            {this.props.projectCategoryList.map(category => (
              <li
                className="cat-task_li"
                key={"projectTaskCategoryName" + category.CategoryID}
                onClick={this.handleUpdate}
                style={{
                  width: "300px",
                  maxHeight: "400px",
                  height: "auto",
                  padding: "40px",
                  verticalAlign: "top",
                  marginTop: "8px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  position: "relative",
                  display: "inline-block",
                  border: "none"
                }}
                id={category.projectID}
                onClick={this.handleClickProject}
              >
                <span className="categorytitle">{category.CategoryName}</span>
                <span className="footer">
                  <input
                    className="add_task_button"
                    src={require("../../images/add_button_2.png")}
                    style={{ width: "20%", height: "90%" }}
                    id={category.CategoryID}
                    onClick={e => this.handleClick(e, category)}
                    type="image"
                  />
                  <button
                    className="add_task_button"
                    id={category.CategoryID}
                    onClick={e => this.handleClick(e, category)}
                    type="submit"
                  >
                    Add New Task
                  </button>
                  <br />
                </span>
                {category.listOfTasks.map(task => (
                  <div
                    className="cat-task_li_li"
                    key={"projectTaskTask" + task.TaskID}
                    onClick={() => this.handleUpdateTask(task)}
                    onMouseOver={e => this.handleMouseOver(e)}
                    onMouseLeave={e => this.handleMouseOut(e)}
                    style={{
                      width: "94%",
                      height: "200px",
                      borderRadius: "5px",
                      marginLeft: "3%",
                      marginTop: "8px",
                      marginBottom: "0",
                      height: "auto",
                      padding: "5px"
                    }}
                  >
                    <div className="cat_tast_head">
                      <span className="cat_task_span">{task.TaskName}</span>

                      <img
                        src={require("./../../images/edit.png")}
                        style={{
                          display: this.state.modalIsOpen,
                          width: "15px",
                          height: "15px"
                        }}
                      />
                    </div>

                    {/* done|||bstart not start*/}
                    <span
                      className="state"
                      style={{
                        background:
                          task.StatusName == "Done" ? "green" : "#f4d03c"
                      }}
                    >
                      {task.StatusName}{" "}
                    </span>

                    {/* <span className="cat_task_span">{task.TaskName}</span> */}
                    <div className="cat_tast_head">
                      <span className="cat_task_span">
                        Assigned to: {task.username}
                      </span>
                    </div>
                    <div className="cat_tast_footer">
                      <span className="time">
                        {moment(task.DueDate).format("D MMM")}
                      </span>
                      {/* <img src={require("./../../images/admin-tool.png")} className="photo" /> */}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>)}
      </div>
    );

    // );
  }
}

export default connect(mapStateToProps)(ProjectTask);
