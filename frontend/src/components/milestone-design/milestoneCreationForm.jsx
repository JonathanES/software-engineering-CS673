import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class MilestoneCreationForm extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
handleSubmit(event){
  event.preventDefault();
  const data = new FormData(event.target);

  data.forEach((element) => {
    console.log(element);

  });
}
render(){
    return(
        <Card body className="text-center" style={{minHeight:"42vmin"}}>
            <CardHeader className="text-center" style={{backgroundColor:"#28A745"}}>Create an Issue</CardHeader>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="milestoneName">Name</Label>
                  <Input type="text" name="headerText" id="milestoneName" placeholder="Enter a name for the milestone" />
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
      //            <Label for="userSelect">Assign a User</Label>
        //          <Input type="date" name="assignedTo" id="userSelect">
          //          <option>User 1</option>
            //        <option>User 2</option>
              //      <option>User 3</option>
                //  </Input>
                </FormGroup>
                <Button className="text-center">Create Issue</Button>
            </Form>
        </Card>
    );
}



}
