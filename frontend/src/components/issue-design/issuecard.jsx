import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Row, Col } from 'reactstrap';
const moment = require("moment")

// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
export default class IssueCard extends React.Component{
    constructor(props){
        super(props);
        // Always bind these once, since otherwise React will keep making new functions with every bind
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            header: this.props.IssueName,
            title:  this.props.AssigneeUsername,
            text:   this.props.Summary,
            buttonText: "Test Button",
            lastUpdate: this.props.LastUpdate,
            assignedTo: this.props.AssignedToID,
            assignee:   this.props.AssigneeID,
            popoverOpen: false
        };
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

    onDeleteButtonClick(event){
        this.props.deleteIssueFromGrid(this.props.IssueID);
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
// className="text-sm-left"
    render(){
        return(
            <Card body className="text-center" style={{minHeight:"42vmin"}}>
                <CardHeader className="text-center" style={this.getHeaderColour(this.props.PriorityID)}>{this.state.header}</CardHeader>
                <CardBody className="text-center">
                    <CardSubtitle className="pb-5">{"Created by: " + ((this.state.title).charAt(0).toUpperCase() + (this.state.title).slice(1)) + " assigned to: " + ((this.props.AssignedToUsername).charAt(0).toUpperCase() + (this.props.AssignedToUsername).slice(1))}</CardSubtitle>
                    <CardText style={{minHeight:"15vmin", color:"black", "font-style": "normal", "font-size": "16px"}}>{this.state.text}</CardText>
                    <CardText>
                        <small id="lastupdate" style={{color:"grey","font-style": "normal"}}>Last updated {moment(this.state.lastUpdate).format('YYYY-MM-DD HH:mm:ss')}</small>
                    </CardText>
                </CardBody>

                <Row>
                    <Col xs={{ size: 4}}>
                        <Button id={"Popover" + this.props.IssueID} key={"Comment" + this.props.IssueID} type="button">
                          Note <Badge color="secondary" className="text-sm-right">4</Badge>
                        </Button>
                    </Col>
                    <Col xs={{ size: 4}}>
                        <Button color="success" key={"Resolve" + this.props.IssueID}>Resolve</Button>
                    </Col>
                    <Col xs={{ size: 4}}>
                        <Button color="danger" onClick={this.onDeleteButtonClick} key={"Delete" + this.props.IssueID}>Delete</Button>
                    </Col>
                </Row>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"Popover" + this.props.IssueID} toggle={this.toggle}>
                  <PopoverHeader>Popover Title</PopoverHeader>
                  <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover>
            </Card>
        );
    }
};
