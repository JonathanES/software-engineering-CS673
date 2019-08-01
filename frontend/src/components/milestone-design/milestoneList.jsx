import React from 'react';
import { connect } from "react-redux";
import MilestoneBasic from "./milestoneBasic.jsx";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Form, FormGroup, Button, ButtonGroup, Label, Input } from 'reactstrap';
import { getListOfMilestones } from "../../socket/milestoneSocket.js";
import { getListOfProjects } from '../../socket/projectSocket';
import moment from 'moment';
//import 'moment-timezone';
//

const mapStateToProps = state => ({
  userId: state.user.userId
});


class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.handleGotMilestones = this.handleGotMilestones.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      //milestones:this.props.milestones,
      //    rSelected: [],
      list: "",
      listOfProject: [],
      projectValue: ""
    };
  }
  generateList(data) {
    let newList = [];
    for (let milestone of data) {
      newList.push(
        <ListGroupItem >
          <div style={{ float: "left", width: "33%" }}>
            Milestone Name: {milestone.MilestoneName}
          </div>
          <div style={{ float: "left", width: "33%" }}>
            Due Date: {moment(milestone.DueDate).format('YYYY-MM-DD')}
          </div>
          {/* <div style={{ float: "left", width: "33%" }}>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Incomplete</Button>
              <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Complete</Button>
            </ButtonGroup>
            <p>Selected: {this.state.rSelected}</p>
          </div> */}
        </ListGroupItem>


        //  <ListGroupItem>Due Date: {milestone.DueDate} </ListGroupItem>
      )
    }
    return newList;
  }

  generateListOfProject(data) {
    let list = [];
    if (data.length > 0) {
      this.setState({ projectValue: data[0].projectName });
      //getListOfMilestones(1, this.handleGotMilestones);
      getListOfMilestones(data[0].projectID, this.handleGotMilestones);
    }
    for (let project of data) {
      list.push(
        <option value={project.projectID} >{project.projectName}</option>
      )
    }
    return list;
  }


  componentDidMount() {
    getListOfProjects(this.props.userId, (err, data) => {
      const listOfProject = this.generateListOfProject(data);
      this.setState({ listOfProject: listOfProject });
    });
  }

  handleGotMilestones(data) {
    this.updateList(data);
  }

  updateList(data) {
    let newList = this.generateList(data);
    this.setState({
      list: newList
    });
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }



  handleProjectChange(event) {
    const projectID = event.target.value;
    this.setState({ projectValue: projectID });
    getListOfMilestones(projectID, this.handleGotMilestones);
  }

  render() {
    return (
      <div>
        <select value={this.state.projectValue} onChange={this.handleProjectChange}>
          {this.state.listOfProject}
        </select>
        <ListGroup>
          {this.state.list}
        </ListGroup>

      </div>
    )
  }
}

export default connect(mapStateToProps)(MilestoneList);
