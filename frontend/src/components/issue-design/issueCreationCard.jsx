import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class IssueCreationCard extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // Green header colour #28A745
    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);

        data.forEach((element) => {
            console.log(element);
        });
    }


    render(){
        return(
            <Card body className="text-center">
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
                      <Input type="select" name="projectID" id="projectSelect">
                        <option>Project 1</option>
                        <option>Project 2</option>
                        <option>Project 3</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="userSelect">Assign a User</Label>
                      <Input type="select" name="assignedTo" id="userSelect">
                        <option>User 1</option>
                        <option>User 2</option>
                        <option>User 3</option>
                      </Input>
                    </FormGroup>
                    <Button className="text-center">Create Issue</Button>
                </Form>
            </Card>
        );
    }

}
