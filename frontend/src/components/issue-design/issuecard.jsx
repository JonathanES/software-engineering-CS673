import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Row, Col } from 'reactstrap';


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
export default class IssueCard extends React.Component{
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            header: this.props.IssueName,
            title:  this.props.AssigneeID,
            text:   this.props.Summary,
            buttonText: "Test Button",
            lastUpdate: this.props.LastUpdate,
            assignedTo: this.props.AssignedToID,
            assignee:   this.props.AssigneeID,
            popoverOpen: false
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
        }, () => {
            console.log(this.props.IssueID);
        });
    }

    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen},
            () => {
                console.log("Updated popup!");
                console.log(this.props.IssueID);
            }
        );
    }


// <Button onClick={this.onButtonClick.bind(this)} color="secondary">{this.state.buttonText}</Button>

    render(){
        return(
            <Card body className="text-center">
                <CardHeader className="text-center" style={this.getHeaderColour(this.props.PriorityID)}>{this.state.header}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{"Created by: " + this.state.title}</CardTitle>
                    <CardText>{this.state.text}</CardText>
                    <Button onClick={this.onButtonClick.bind(this)} color="secondary">{this.state.buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Last updated {this.state.lastUpdate}</small>
                    </CardText>
                </CardBody>
                <Row>
                    <Col className="text-sm-left">
                        <Button id={"Popover" + this.props.IssueID} type="button">
                          Comments <Badge color="secondary" className="text-sm-right">4</Badge>
                        </Button>
                    </Col>
                    <Col className="text-sm-right">
                        <Button color="danger">Delete</Button>
                    </Col>
                </Row>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"Popover" + this.props.IssueID} toggle={this.toggle.bind(this)}>
                  <PopoverHeader>Popover Title</PopoverHeader>
                  <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover>
            </Card>
        );
    }
};
