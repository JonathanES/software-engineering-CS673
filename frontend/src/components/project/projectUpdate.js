import React from "react";
import { connect } from 'react-redux';


import { getAddtoProject, getUserLevel, getprojectdetail,getAvailableUsers} from '../../socket/projectSocket';
import {getuserprev} from '../../socket/taskSocket';

import '../../css/projectUpdate.css'

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  projectID: state.demand.projectID,
  projectName: state.demand.projectName,
  //isProjectSelected: state.project.isProjectSelected
  //taskname: state.Task.newtask
});


class ProjectUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      pID: props.projectID,
      projectName: props.projectName,
      listOfFriends: [],
      userlevels:[],
      username: '',
      dueDate:'',
      userType:false,
      pname:'',
      newuserid:'',
      newusertype: '',


    };

    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  componentDidMount() {

    getAvailableUsers(this.state.pID, this.state.userId, (err, data) => {
      this.setState({ listOfFriends: data });
      console.log('Available users:', data);
      // this.state.listOfFriends.push(data);
      // this.setState({ listOfFriends: "" });
      // console.log(this.state.listOfFriends);
      this.state.listOfFriends.push({Userid:0,username:'Please Select a User'});
      console.log(this.state.listOfFriends);
      
      // this.setState({ listOfFriends: data });
    });


    getprojectdetail(this.state.pID, (err, data) => {
      console.log('projectdetail:',data)
      this.setState({pname:data[0].ProjectName})
    })

    getuserprev(this.state.pID, this.state.userId, (err,data) => {
      console.log(data[0].AccountTypeID);

      if(data[0].AccountTypeID != 3 ){
          this.setState({userType:true})
          getUserLevel((err,data)=>{
            this.setState({userlevels:data})
            console.log('User levels:',data);
          })
          console.log('Call the update page with id: ', this.state.pID);
          console.log('User type is admin');
      }
      else{
          this.setState({userType:false})
          console.log('Sorry you don\'t have the admin privilidges' );
      }
    })

    


  }

  handleAddUser(event){

    console.log('ProjectID:', this.props.pID);
    console.log('newUserID:',parseInt(this.state.newuserid));
    console.log('User type will be:',parseInt(this.state.newusertype));
     getAddtoProject(this.state.pID, parseInt(this.state.newuserid), parseInt(this.state.newusertype), (err,data) =>{
       console.log(data);
       getAvailableUsers(this.state.pID, this.state.userId, (err, data) => {
        this.setState({ listOfFriends: data });
        console.log('Available users:', data);
      });
      
    })
    event.preventDefault();
  }


  handleClick(event) {
    
  }


  handleLevelChange(event) {
    console.log('User Type:',event.target.value);
    this.setState({newusertype: event.target.value}); 
    event.preventDefault();
  }


  handleNewUser(event){

    console.log('User ID:',event.target.value);
    this.setState({newuserid: event.target.value}); 
    event.preventDefault();
  }


  handleSubmit(event) {

  }

  render() {
    return (
      <div>
        <div className="projectform">
          <div className="projectform-header">
            <h2> Update Project Information for Project {this.state.pname} </h2>
          </div>
          <div className="projectform-contain">
            <div className="projectform-group">
              <form onSubmit={this.handleSubmit}>
                <div className="projectform-field">
                  <label htmlFor="projectName">Project Name :</label>
                  <input id="projectName" type="text" value={this.state.projectName} onChange={() => this.handleChange} />
                </div>
                <div className="projectform-field">
                  <label htmlFor="dueDate">Due Date :</label>
                  <input id="dueDate" type="text" value={this.state.dueDate} onChange={()=>this.handleChange} />
                </div>
                <div className="projectform-field">
                  <label htmlFor="adduser">Add User to Project:</label>
                  <select onChange = {this.handleNewUser}>
                    {this.state.listOfFriends.map(friend =>
                      <option value={friend.UserID} id={friend.UserID}>{friend.username}</option>

                    )}
                  </select>
                  </div>
                  {this.state.userType && 
                  <div>
                    <label htmlFor="UserlevelSelection">Select the Type for user privileges:</label>
                    <select onChange ={this.handleLevelChange}>
                      {this.state.userlevels.map(level =>
                        <option value={level.AccountTypeID}> {level.TypeName} </option>

                      )}
                    </select>
                    </div>
                  }
                  <button type="submit" className="addUserToProject" onClick={this.handleAddUser}>Add to Project</button>
                
                <div><button type="submit" className="projectformbtn uppercase">Update Project</button></div>

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
