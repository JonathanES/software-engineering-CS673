import React from "react";
import { connect } from 'react-redux';
import { addProject} from '../../socket/projectSocket';
import {getListOfProjects} from '../../socket/projectSocket';
//import {userId} from '../../socket/userSocket';
import '../../css/project.css'

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  projectID: state.project.projectID,
  listOfProjects: state.project.listOfProjects,
});


class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      projectID : props.projectID,
      projectName:'',
      username: '',
      dueDate:''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // this.props.dispatch({ type: 'USER_CREATE_PROJECT_DEMAND'})
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

    //console.log('After clicking add project button');
    //console.log('Handle Submit: userID', this.state.userId, ' Project Name:', this.state.projectName, ' Due Date:', this.state.dueDate)
    if (this.state.projectName == "" ) {
      alert("Please check your input, you cannot leave Project Name empty");

    }
    else if(this.state.dueDate ==""){
      alert("Please check your input, you cannot leave Project Due Date empty");
    }
    else {
      console.log('Adding New Project');
      console.log('Project Name:',this.state.projectName);
      console.log('Due Date:', this.state.dueDate);
      addProject(this.state.userId, this.state.projectName, this.state.dueDate, (err, data) => {

        this.props.dispatch({type: 'USER_LIST_OF_PROJECT_DEMAND', listOfProjects:data});

      });
    }
    event.preventDefault();
  }

  render() {
    return (
        <div className="projectform">
          <div className="projectform-header">
            <h1 id = "addNProjT" className="uppercase"> Add a new Project </h1>
          </div>
          <div className="projectform-contain">
            <div className="projectform-group">
              <form onSubmit={this.handleSubmit} id="createProjectForm">
                <div className="projectform-field">
                  <label htmlFor="projectName">Project Name :</label>
                  <input id="projectName" type="text" value={this.state.projectName} onChange={this.handleChange}  placeholder="Enter Project Name"/>
                </div>
                <div className="projectform-field">
                  <label for="dueDate">Due Date:</label>
                  <input type="date" id="dueDate" name="trip-start" value={this.state.dueDate} min="2019-06-01" max="2020-12-31" onChange={this.handleChange} />
                </div>
                <button id="copyButtonColor" type="submit" className="projectformbtn uppercase">Add Project</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}
export default connect(mapStateToProps)(ProjectForm);
