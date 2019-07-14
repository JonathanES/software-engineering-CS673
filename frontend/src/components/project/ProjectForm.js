import React from "react";
import { connect } from 'react-redux';
import { addProject, getListOfProjects, showCategories } from '../../socket/projectSocket';
import ProjectTask from '../Task/projectTask.js';
//import {userId} from '../../socket/userSocket';
import '../../css/project.css'

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  //projectID: state.project.projectID,
  //isProjectSelected: state.project.isProjectSelected
  //taskname: state.Task.newtask
});


class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      projectName:'',
      username: '',
      dueDate:''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.dispatch({ type: 'USER_CREATE_PROJECT_DEMAND'})
  }
  handleChange(event) {
    switch (event.target.id) {
      case "projectName":
        this.setState({ projectName: event.target.value });
        break;
      case "dueDate":
        this.setState({ dueDate: event.target.value });
        break;
      // case "password":
      //   this.setState({ password: event.target.value });
      //   break;
      // case "password-confirmation":
      //   this.setState({ passwordConfirmation: event.target.value });
      //   break;
      default:
        break;
    }
  }

  
  handleSubmit(event) {

    console.log('After clicking add project button');
    console.log('Handle Submit: userID', this.state.userId, ' Project Name:', this.state.projectName, ' Due Date:', this.state.dueDate)
    addProject(this.state.userId, this.state.projectName, this.state.dueDate, (err, data) => {
      console.log(data);
      //here we should call the mainpage, so they can see the project added to their screen, wonder how we will do it
      //this.props.dispatch({ type: 'USER_LOGIN', username: data.username});
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="projectform">
          <div className="projectform-header">
            <h1 className="uppercase"> Add a new Project </h1>
          </div>
          <div className="projectform-contain">
            <div className="projectform-group">
              <form onSubmit={this.handleSubmit}>
                <div className="projectform-field">
                  <label htmlFor="projectName">Project Name :</label>
                  <input id="projectName" type="text" value={this.state.projectName} onChange={this.handleChange} />
                </div>
                <div className="projectform-field">
                  <label htmlFor="dueDate">Due Date :</label>
                  <input id="dueDate" type="text" value={this.state.dueDate} onChange={this.handleChange} />
                </div>
                {/* <div className="projectform-field">
                  <label htmlFor="password">Password :</label>
                  <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="projectform-field">
                  <label htmlFor="password-confirmation">Confirmation :</label>
                  <input id="password-confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                </div> */}
                <button type="submit" className="projectformbtn uppercase">Add Project</button>
              </form>
            </div>
            {/* <p className="account-help">You already have an account ? <a onClick={this.handleClick} className="underline red" >Login</a></p> */}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(ProjectForm);
