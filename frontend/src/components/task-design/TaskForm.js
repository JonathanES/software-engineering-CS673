import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { addTask, getTask } from '../../socket/taskSocket'
import { showCategories_old, getPriorities, getAvailableUsers } from '../../socket/projectSocket';
import '../../css/task.css'

const mapStateToProps = state => ({
  userId: state.user.userId,
  category: state.project.category,
  projectID: state.project.projectID,
  project:state.project.project,
  projectCategoryList: state.project.projectCategoryList,
  projectName: state.project.projectName
  //addTask: state.message.addTask
});


class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      parentID: 1,
      categoryID: props.category.CategoryID,
      categoryName: props.category.CategoryName,
      projectName: props.projectName,
      pID: props.pID,
      priorityID: '',
      taskName: '',
      taskInfo: '',
      expDuration: '',
      taskPriorities: [],
      newTask:{},
      listOfFriends:[],

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  componentDidMount() {

    getPriorities((err, data) => {
      this.setState({ taskPriorities: data })
      console.log(data)
      this.state.taskPriorities.push({PriorityID:4,Priority:'Please Select One'});
      console.log(this.state.taskPriorities)
      //console.log('User levels:',this.state.userlevels);
    })

    getAvailableUsers(this.state.pID, this.state.userId, (err, data) => {
      this.setState({ listOfFriends: data });
      this.state.listOfFriends.push({UserID:0,username:'Please Select a User'});      
    });

  }
  handleClick(event) {

  }

  handleNewUser(event){

    //console.log('User ID:',event.target.value);
    this.setState({newuserid: event.target.value}); 
    //event.preventDefault();
  }

  

  handlePriorityChange(event) {
    console.log('User Type:', event.target.value);
    console.log('User Type:', event.target.selectedIndex);
    this.setState({ priorityID: event.target.value });
    event.preventDefault();
  }





  handleChange(event) {
    switch (event.target.id) {
      case "taskName":
        if (event.target.value != '') {
          this.setState({ taskName: event.target.value });
        }
        break;
      case "priorityID":
        this.setState({ priorityID: event.target.value });
        break;
      case "taskInfo":
        this.setState({ taskInfo: event.target.value });
        break;
      case "expDuration":
        //console.log(typeof (parseInt(event.target.value)));
        if (typeof (parseInt(event.target.value)) == 'number') {
          this.setState({ expDuration: event.target.value });
        }
        break;
      case "dueDate":
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

    if (this.state.taskName == '') {
      alert('Please check your input, Task Name cannot be empty');
    }
    else if (this.state.priorityID == '') {
      alert('Please select the task\'s priority');
    }
    else if (this.state.expDuration == '') {
      alert('Please enter an expected duration to complete this task');
    }
    else {

  
      addTask(1, this.state.categoryID, this.state.userId, 1, this.state.priorityID, this.state.taskName, this.state.taskInfo, this.state.dueDate, this.state.expDuration, 0, async (err, data) => {
        // addProject(this.state.userId, this.state.projectName, this.state.dueDate, (err, data) => {
        console.log(data);
        //here we should call the mainpage, so they can see the project added to their screen, wonder how we will do it
        //this.props.dispatch({ type: 'USER_LOGIN', username: data.username});
        // console.log('Project ID:',this.props.projectCategoryList[0].ProjectID);
        // console.log('projectCategoryList:',this.props.projectCategoryList);
        // console.log('ProjectName:',this.props.projectName);
        const listofT = this.props.projectCategoryList;

        await getTask(data.insertId, async(err,data)=>{
          console.log(data[0]); 
          
          this.setState({newTask: data[0]});
          console.log(this.state.newTask);
        })

        //const newTask = await getTask(data.insertId);

        
        this.setState({ taskName: '' });
        this.setState({ priorityID: '' });
        this.setState({ taskInfo: '' });
        this.setState({ expDuration: ' ' });
        this.setState({ dueDate: '' });
      });

      this.props.dispatch({type: 'USER_IS_PROJECTTASK_DEMAND',project: this.props.project, projectCategoryList: this.props.projectCategoryList});

      //this.props.dispatch({ type: 'USER_PROJECT_DEMAND' })
      //this.props.dispatch({ type: 'USER_VIEW_PROJECT' })
      // this.props.dispatch({ type: 'USER_IS_PROJECT_DEMAND', projectID: this.props.projectCategoryList[0].ProjectID, projectCategoryList: this.props.projectCategoryList, projectName: this.props.projectName });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="taskform">
          <div className="taskform-header">
            <h4> Add a new Task for Project {this.props.projectName} under {this.props.category.CategoryName} category</h4>
          </div>
          <div className="taskform-contain">
            <div className="taskform-group">
              <form onSubmit={this.handleSubmit}>
                <div className="taskform-field">
                  <label htmlFor="taskName">Task Name :</label>
                  <input id="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
                </div>
                <div className="taskform-field">
                  <label htmlFor="prioritylevelSelection">Priority of the Task:</label>
                  <select onChange={(e) => this.handlePriorityChange(e)}>
                    {this.state.taskPriorities.map(tp =>
                      <option selected={tp.PriorityID} value={tp.PriorityID}> {tp.Priority} </option>
                    )}
                  </select>
                </div>
                <div className="taskform-field">
                  <label htmlFor="taskInfo">TaskInfo:</label>
                  <input id="taskInfo" type="text" value={this.state.taskInfo} onChange={this.handleChange} />
                </div>
                <div className="taskform-field">
                  <label for="dueDate">Due Date:</label>
                  <input type="date" id="dueDate" className="trip-start" value={moment(this.state.dueDate).format('YYYY-MM-DD')} min="2019-06-01" max="2030-12-31" onChange={this.handleChange} />
                </div>
                <div className="taskform-field" style={{marginBottom:'43px'}}> 
                  <label htmlFor="expDuration">Expected Time to Complete:</label>
                  <input id="expDuration" type="number" value={this.state.expDuration} onChange={this.handleChange} />
                  <span> hours</span>
                </div>
                <div className="taskform-field">
                  <label htmlFor="assignuser">Assign to user:</label>
                  <select onChange = {this.handleNewUser}>
                    {this.state.listOfFriends.map(friend =>
                      <option selected={friend.username} value={friend.UserID} id={friend.UserID}>{friend.username}</option>
                    )}
                  </select>
                  </div>
                <button type="submit" className="taskformbtn uppercase">Add Task</button>
              </form>
            </div>
            {/* <p className="account-help">You already have an account ? <a onClick={this.handleClick} className="underline red" >Login</a></p> */}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(TaskForm);