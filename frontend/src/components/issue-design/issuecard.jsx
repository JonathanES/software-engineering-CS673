import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter, Popover, PopoverHeader, PopoverBody } from 'reactstrap';


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
export  default class IssueCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            header: this.props.IssueName,
            title:  this.props.PriorityID,
            text:   this.props.Summary,
            buttonText: "Test Button",
            lastUpdate: this.props.LastUpdate,
            assignedTo: this.props.AssignedToID,
            assignee:   this.props.AssigneeID,
        }
    }
    getHeaderColour(priority){

        if(priority == 1){  // Blue Header
            return(
                {backgroundColor:"#157ffb"}
            );
        }else if(priority == 2){  // Yellow Header
            return(
                {backgroundColor:"#fdc02f"}
            );
        }else if(priority == 3){  // Red Header
            return(
                {backgroundColor:"#d63648"}
            );
        }else{  // Blue Header
            return(
            {backgroundColor:"#157ffb"}
            );
        }
    }


    onButtonClick(){
        let newText = "Test Click!";
        this.setState({
            buttonText: newText
        });
    }
// <Button onClick={this.onButtonClick.bind(this)} color="secondary">{this.state.buttonText}</Button>

    render(){
        return(
            <Card body>
                <CardHeader className="text-center" style={this.getHeaderColour(this.props.PriorityID)}>{this.state.header}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{this.state.title}</CardTitle>
                    <CardText>{this.state.text}</CardText>
                    <Button onClick={this.onButtonClick.bind(this)} color="secondary">{this.state.buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Last updated {this.state.lastUpdate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {this.state.assignedTo} by {this.state.assignee}</CardFooter>
            </Card>
        );
    }
};
