import React from "react";
import { connect } from 'react-redux';
import moment from 'moment'

import { getAddtoProject, getUserLevel, getprojectdetail, getAvailableUsers, deleteproject, updateDeleteProjectDependencies } from '../../socket/projectSocket';
import { updateProjectName, updateProjectDueDate, getListOfProjects } from '../../socket/projectSocket';

import { getUserPrev } from '../../socket/taskSocket';

import '../../css/projectUpdate.css'

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  project: state.project.project,
  projectName: state.project.projectName,
  listOfProjects: state.project.listOfProjects
  //isProjectSelected: state.project.isProjectSelected
  //taskname: state.Task.newtask
});


class ProjectUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      pID: props.project.projectID,
      projectName: props.project.projectName,
      listOfFriends: [],
      userlevels: [],
      username: '',
      dueDate: props.project.dueDate,
      userType: false,
      pname: '',
      newuserid: '',
      newusertype: '',


    };

    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleUpdateProject = this.handleUpdateProject.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {

    //console.log(this.props.project);

    getUserLevel((err, data) => {
      this.setState({ userlevels: data })
      this.state.userlevels.push({ AccountTypeID: 0, TypeName: 'Please Select a User Type' });

      //console.log('User levels:', this.state.userlevels);
    })
    //this.state.projectName = this.props.projectName;
    //this.handleNameChange(this.state.projectName)
    //this.state.dueDate = '2019-07-25';
    //this.setState({dueDate:'2019-07-25'});
    //console.log('ComponentDidMount:',this.state.dueDate);
    //this.handleDateChange(this.state.dueDate);


    getAvailableUsers(this.state.pID, this.state.userId, (err, data) => {
      this.setState({ listOfFriends: data });
      //console.log('Available users:', data);
      // this.state.listOfFriends.push(data);
      // this.setState({ listOfFriends: "" });
      // console.log(this.state.listOfFriends);
      this.state.listOfFriends.push({ UserID: 0, username: 'Please Select a User' });
      //console.log('Available Users:', this.state.listOfFriends);

    });

    getprojectdetail(this.state.pID, (err, data) => {
      //console.log('projectID:', this.props.project.projectID);
      //console.log('projectName:', this.props.project.projectName);

    })

    getUserPrev(this.props.project.projectID, this.state.userId, (err, data) => {
      //console.log(data[0].AccountTypeID);

      if (data[0].AccountTypeID != 3) {
        this.setState({ userType: true })
      }
      else {
        this.setState({ userType: false })
        alert('Sorry you don\'t have the admin privilidges');
      }
    })




  }

  handleAddUser(event) {

    getAddtoProject(this.props.project.projectID, parseInt(this.state.newuserid), parseInt(this.state.newusertype), (err, data) => {
      getAvailableUsers(this.props.project.projectID, this.state.userId, (err, data) => {
        this.setState({ listOfFriends: data });
      });
    })

    getUserLevel((err, data) => {
      this.setState({ userlevels: data })

      //console.log('User levels:', this.state.userlevels);
    })

  }

  handleDateChange(newDate) {
    //console.log(newDate);
    this.setState({ dueDate: newDate })
  }

  handleNameChange(newName) {
    //console.log('Name Change:', newName);
    this.setState({ projectName: newName })

  }

  handleClick(event) {

  }


  handleLevelChange(event) {
    //console.log('User Type:',event.target.value);
    this.setState({ newusertype: event.target.value });

  }


  handleNewUser(event) {

    //console.log('User ID:',event.target.value);
    this.setState({ newuserid: event.target.value });
    event.preventDefault();
  }

  handleDeleteProject(e) {
    //console.log('ProjectID:', this.props.project.projectID)
    // deleteproject(this.props.project.projectID,1, (err,data)=>{
    //   console.log('Deleted:',data);
    // });

    updateDeleteProjectDependencies(this.props.project.projectID, 1, (err, data) => {
      //console.log('Deleted:', data);
      const project = this.props.project;
      project.isDeleted = 1;

      //console.log('before update:', this.props.listOfProjects);
      getListOfProjects(this.props.userId, (err, data_list) => {
        //console.log('after update:', data_list);
        this.props.dispatch({ type: 'USER_LIST_OF_PROJECT_DEMAND', listOfProjects: data_list });

      });
    });




    this.props.dispatch({ type: 'USER_PROJECT_DEMAND' })
    this.props.dispatch({ type: 'USER_VIEW_PROJECT' })

  }

  handleUpdateProject(event) {
    // console.log('New Name:', this.state.projectName);
    // console.log('old Name:', this.props.project.projectName);
    // console.log('DueDate:', this.state.dueDate);
    const project = {};

    if (this.state.projectName != this.props.project.projectName && this.state.projectName != '') {
      updateProjectName(this.props.project.projectID, this.state.projectName, (err, data) => {
        //console.log('Name change is:', data);
        this.project = this.props.project;
        this.project.projectName = data;
        this.props.dispatch({ type: 'USER_PROJECTUPDATEFORM', project: project });
      });
    }

    if (this.state.dueDate != this.props.project.dueDate && this.state.dueDate != '') {
      updateProjectDueDate(this.props.project.projectID, this.state.dueDate, (err, data) => {
        //console.log('New Due Date:', data);

      });
    }


    //this.props.dispatch({ type: 'USER_PROJECT_DEMAND', project:project })
    // this.props.dispatch({ type: 'USER_PROJECTUPDATEFORM', project:project });
    // this.props.dispatch({ type: 'USER_PROJECT_DEMAND' })
    // this.props.dispatch({ type: 'USER_VIEW_PROJECT' })

  }

  render() {
    return (
      <div>
        <div className="projectform">
          <div>
            <h2> Update Project Information for Project {this.state.pname} </h2>
          </div>
          <div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="projectName">Project Name :</label>
                  <input type="text" value={this.state.projectName} onChange={(e) => this.handleNameChange(e.target.value)} />
                </div>
                <br />
                <div>
                  <label htmlFor="dueDate">Due Date:</label>
                  <input type="date" id="dueDate4" className="trip-start" value={moment.parseZone(this.state.dueDate)} min="2019-06-01" max="2030-12-31" onChange={(e) => this.handleDateChange(e.target.value)} />
                </div>
                <br />
                <div>
                  <label htmlFor="adduser">Available Users:</label>
                  <select onChange={this.handleNewUser}>
                    {this.state.listOfFriends.map(friend =>
                      <option selected={friend.username} value={friend.UserID} id={friend.UserID}>{friend.username}</option>

                    )}
                  </select>
                </div>
                <br />

                {this.state.userType &&
                  <div>
                    <label htmlFor="UserlevelSelection">Select the Type for user privileges:</label>
                    <select onChange={this.handleLevelChange}>
                      {this.state.userlevels.map(level =>
                        <option selected={level.TypeName} value={level.AccountTypeID} id={level.AccountTypeID}> {level.TypeName} </option>)}
                    </select>

                    <button id="projectUpdateAddUserBtn" onClick={this.handleAddUser}>Add User to Project</button>
                      <br/>
                    <div className="modal-footer">
                      <br/>
                    <button id="projectUpdateUpdateBtn" onClick={(e) => this.handleUpdateProject(e)}>Update Project</button>
                    <button id='projectUpdateDeleteBtn' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Project?')) this.handleDeleteProject(e) }}>Delete Project </button>
                    </div>
                  </div>
                }
              </form>
            </div>
            {/* <p className="account-help">You already have an account ? <a onClick={this.handleClick} className="underline red" >Login</a></p> */}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(ProjectUpdate);
