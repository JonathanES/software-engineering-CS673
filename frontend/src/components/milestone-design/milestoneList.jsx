import React from 'react';
import { connect } from "react-redux";
import MilestoneBasic from "./milestoneBasic.jsx";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { getListOfMilestones } from "../../socket/milestoneSocket.js";
import { getListOfProjects } from '../../socket/projectSocket';


const mapStateToProps = state => ({
  userId: state.user.userId
});


class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.handleGotMilestones = this.handleGotMilestones.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);

    this.state = {
      //milestones:this.props.milestones,
      list: "",
      listOfProject: [],
      projectValue: ""
    };
  }
  generateList(data) {
    let newList = [];
    for (let milestone of data) {
      newList.push(
        <ListGroupItem>{milestone.MilestoneName}  {milestone.DueDate}</ListGroupItem>
      )
    }
    return newList;
  }

  generateListOfProject(data) {
    let list = [];
    if (data.length > 0) {
      this.setState({ projectValue: data[0].projectName });
      getListOfMilestones(1, this.handleGotMilestones);
      // getListOfMilestones(data[0].projectID, this.handleGotMilestones);
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

  handleProjectChange(event) {
    const projectID = event.target.value;
    this.setState({projectValue: projectID});
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
