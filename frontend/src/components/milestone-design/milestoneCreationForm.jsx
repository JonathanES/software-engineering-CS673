import React from 'react';
import { connect } from "react-redux";
import {
  Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import { getListOfProjects } from '../../socket/projectSocket';

const mapStateToProps = state => ({
  userId: state.user.userId
});

class MilestoneCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfProject: [],
      projectValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let formDataArray = [];

    const data = new FormData(event.target);
    data.forEach((element) => {
        formDataArray.push(element);
    })

    let milestoneName = formDataArray[0].split(" ")[0];
    let projectID = formDataArray[1].split(" ")[0];
    let date = formDataArray[2].split(" ")[0];    
    
    this.props.milestoneCreation(projectID, milestoneName, date)
  }

  componentDidMount() {
    getListOfProjects(this.props.userId, (err, data) => {
      const listOfProject = this.generateListOfProject(data);
      this.setState({ listOfProject: listOfProject });
    });
  }

  generateListOfProject(data) {
    let list = [];
    if (data.length > 0) {
      this.setState({ projectValue: data[0].projectName });
    }
    for (let project of data) {
      list.push(
        <option value={project.projectID} >{project.projectName}</option>
      )
    }
    return list;
  }

  render() {
    return (
      <Card body className="text-center" style={{ minHeight: "42vmin" }}>
        <CardHeader className="text-center" style={{ backgroundColor: "#28A745" }}>Create a Milestone</CardHeader>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="milestoneName">Name</Label>
            <Input type="text" name="headerText" id="milestoneName" placeholder="Enter a name for the milestone" />
          </FormGroup>
          <FormGroup>
            <Label for="projectSelect">Project</Label>
            <Input type="select" name="projectID" id="projectSelect">
              {this.state.listOfProject}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dateSelect">Assign a Date</Label>
            <Input type="date" name="assignedTo" id="dateSelect" />
          </FormGroup>
          <Button className="text-center">Create a Milestone</Button>
        </Form>
      </Card>
    );
  }



}

export default connect(mapStateToProps)(MilestoneCreationForm);
