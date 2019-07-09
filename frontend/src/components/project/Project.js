import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";

import { addproject, getProjects } from '../../socket/projectSocket';
//import { connect } from 'tls';

import '../../css/project.css';

const maptoStateToProps = state => ({
  username: state.user.username,
  userID: state.user.userID
});


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.userID,
      username: props.username,
      projectName: props.projectName,
      dueDate: props.dueDate,
      listOfProjects: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //getMessage();
    //console.log(userID);
    getProjects(this.state.userID, (err, data) => {
      data.forEach(elt => {
        elt.isadd = 'false'
        elt.color = "rgb(155, 121, 156)";
      })
      this.setState({ listOfProjects: data });
    });

    //console.log(listOfProjects);
  }

  handleChange(event) {
    // this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    // addproject(this.state.userID, this.state.projectName, this.state.dueDate, (err, data) => {
    //   this.setState({ listOfProjects: data });
    // })
    // event.preventDefault();
  }

  handleClick(event) {
    // const listOfProjects = this.state.listOfProjects;
    // listOfProjects.forEach(elt => {
    //   getProjects(this.state.userID, (err, data) => {
    //     this.setState({ listOfProjects: data })
    //   })
    //   this.setState({ listOfProjects: listOfProjects });
    // })
  }




  render() {
    return (
      <div class="box">
        {/* <div class="leftbar">
              <ul>
                  <li><i class="fas fa-user"></i></li>
                  <li><i class="fas fa-user-circle"></i></li>
                  <li><i class="fas fa-wrench"></i></li>
                  <li><i class="fas fa-folder-open"></i></li>
                  <li><i class="fas fa-bell"></i></li>
                  <li><i class="fas fa-envelope"></i></li>
                  <li><i class="fas fa-power-off"></i></li>
              </ul>
          </div> */}
        <div class="container">
          <div class="chatbox">
            <div class="chatleft">
              <div class="top">
                {/* <i class="fas fa-bars" style={{"font-size": "1.4em"}}></i>
                          <input type="text" class="search-chatleft" placeholder="search"/>
                          <button class="searchbtn"><i class="fas fa-search"/></button> */}
                <div class="appname">
                  SwelloDesk
                          </div>
                <div class="personalname">
                  <div class="yuan yuanselect"></div>
                  <div class="charlefttext">
                    Yuanping Yao
                            </div>
                </div>
              </div>
              <div class="center">
                {/* group message */}


                {/* direct message */}
                <div class="direct">
                  <div class="title">Direct Message</div>
                  <ul>
                    {this.state.listofProjects.map(project =>
                      <li>
                        <div class="personalname" id={project.userID} onClick={this.handleClick}>
                          <div className={project.isadd == "true" ? "yuan yuanselect" : "yuan"}></div>
                          <div class="charlefttext">
                            <span class="span-user-left">{project.username}</span>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(maptoStateToProps)(Project);
//export default connect(mapStateToProps)(Chat);
