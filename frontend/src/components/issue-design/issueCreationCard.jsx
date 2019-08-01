import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {getListOfProjects, getAvailableUsersForProject} from "../../socket/projectSocket.js"

export default class IssueCreationCard extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onHandleChangeUpdateProjectUserList = this.onHandleChangeUpdateProjectUserList.bind(this);

        this.state = {
            projectList: "",
            projectUserList: "",
            selectedProject: ""
        };
    }

    componentDidMount(){
        this.updateProjectList();
    }

    // Green header colour #28A745
    handleSubmit(event){
        event.preventDefault();
        let formDataArray = [];
        const formData = new FormData(event.target);
        formData.forEach((element) => {
            formDataArray.push(element);
        })

        let priorityID = formDataArray[2].split(" ")[0];
        let projectID = formDataArray[3].split(" ")[0];
        let assignedUserID = formDataArray[4].split(" ")[0];

        // issueName, issueSummary, issuePriority, issueProject, assignedTo
        this.props.createIssue(formDataArray[0], formDataArray[1], priorityID, projectID, assignedUserID);
    }

    updateProjectList(){
        let newProjectList = [];
        let firstProjectID = "";
        // Generate array of JSX
        getListOfProjects(this.props.userID, (blank, projectData) => {
            firstProjectID = projectData[0].projectID;

            projectData.forEach((project) => {
                newProjectList.push(<option key={"Project List " + project.projectID}>
                                    {project.projectID} - {project.projectName}
                                </option>);
            });

            // Update the for the first project which will appear
            let newProjectUserList = [];
            getAvailableUsersForProject(firstProjectID, (blank, projectUserData) => {
                projectUserData.forEach((user) => {
                    newProjectUserList.push(<option key={"User List " + user.UserID}>
                                                {user.UserID} - {user.username}
                                            </option>);
                });

                // Update the project list state for displaying + auto select first project and after both functions have returned data
                this.setState({
                    projectList: newProjectList,
                    projectUserList: newProjectUserList,
                    selectedProject: firstProjectID
                });
            });
        });
    }

    onHandleChangeUpdateProjectUserList(event){
        // Update the user list for the new project selected
        let newProjectID = event.target.value.split(" ")[0] // Split the string by the spaces then select the first element which is the ID
        let newProjectUserList = [];
        getAvailableUsersForProject(newProjectID, (blank, projectUserData) => {
            projectUserData.forEach((user) => {
                newProjectUserList.push(<option key={"User List " + user.UserID}>
                                            {user.UserID} - {user.username}
                                        </option>);
            });

            // Update the project list state for displaying + auto select first project and after both functions have returned data
            this.setState({
                projectUserList: newProjectUserList,
                selectedProject: newProjectID
            });
        });
    }

    render(){
        return(
            <Card body className="text-center" style={{minHeight:"42vmin"}}>
                <CardHeader className="text-center" style={{backgroundColor:"#28A745"}}>Create an Issue</CardHeader>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="issueHeader">Name</Label>
                      <Input type="text" name="headerText" id="issueHeader" placeholder="Enter a name for the issue" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="issueSummary">Summary</Label>
                      <Input type="text" name="summary" id="issueSummary" placeholder="Enter a summary for the issue" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="prioritySelect">Priority</Label>
                      <Input type="select" name="priority" id="prioritySelect">
                        <option>1 - Low</option>
                        <option>2 - Medium</option>
                        <option>3 - High</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="projectSelect">Project</Label>
                      <Input type="select" name="projectID" id="projectSelect" onChange={this.onHandleChangeUpdateProjectUserList}>
                        {this.state.projectList}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="userSelect">Assign a User</Label>
                      <Input type="select" name="assignedTo" id="userSelect">
                        {this.state.projectUserList}
                      </Input>
                    </FormGroup>
                    <Button className="text-center">Create Issue</Button>
                </Form>
            </Card>
        );
    }

}
