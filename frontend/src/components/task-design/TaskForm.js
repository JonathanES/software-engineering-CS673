import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addTask} from '../../socket/taskSocket'
import '../../css/task_add.css'

const mapStateToProps = state => ({
    userId : state.user.userId,
    categoryID: state.project.categoryID,
    //addTask: state.message.addTask
});


class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userId: props.userId,
          parentID: props.categoryID,
          categoryID:props.categoryID,
          priorityID: '',
          taskName: '',
          taskInfo:'N/A',
          expDuration:''
    
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(event) {
        
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
            case "expDur":
                this.setState({ expDuration: event.target.value });
                break;
            default:
                break;
        }
      }
    
      
      handleSubmit(event) {
    
        console.log('After clicking add project button');
        console.log('Handle Submit: userID', this.state.userId);
        console.log('Category ID:', this.props.categoryID);
        console.log('TaskName:', this.props.taskName);

        // addTask(this.props.parentID, this.props.categoryID, this.state.userId, 0, this.props.priorityID, this.props.taskName, this.props.taskInfo, this.props.expDuration, 0 , (err,data) =>{
        // // addProject(this.state.userId, this.state.projectName, this.state.dueDate, (err, data) => {
        //   console.log(data);
        //   //here we should call the mainpage, so they can see the project added to their screen, wonder how we will do it
        //   //this.props.dispatch({ type: 'USER_LOGIN', username: data.username});
        // });
        event.preventDefault();
      }
    
      render() {
        return (
          <div>
            <div className="taskform">
              <div className="taskform-header">
                <h1 className="uppercase"> Add a new Task under Project {this.state.projectID} and category {this.props.categoryID} </h1>
              </div>
              <div className="taskform-contain">
                <div className="taskform-group">
                  <form onSubmit={this.handleSubmit}>
                    <div className="taskform-field">
                      <label htmlFor="taskName">Task Name :</label>
                      <input id="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
                    </div>
                    <div className="taskform-field">
                      <label htmlFor="priorityID">Priority:</label>
                      <input id="priorityID" type="text" value={this.state.priorityID} onChange={this.handleChange} />
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