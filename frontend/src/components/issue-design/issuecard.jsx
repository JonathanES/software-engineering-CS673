import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody, Row, Col, ListGroup, ListGroupItem, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupDropdown, Input } from 'reactstrap';

import {getCommentsForIssue, createCommentForIssue} from "../../socket/issuesSocket.js";

const moment = require("moment")

// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
export default class IssueCard extends React.Component{
    constructor(props){
        super(props);

        // Always bind these once, since otherwise React will keep making new functions with every bind
        this.onResolveButtonClick = this.onResolveButtonClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onAddCommentButtonClick = this.onAddCommentButtonClick.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            popoverOpen: false,
            resolveText: "",
            headerColour: {backgroundColor:"#157ffb"},
            commentList: ""
        };
    }

    componentDidMount(){
        if(this.props.IsResolved == 0){
            this.setState({
                    resolveText: "Resolve",
                    headerColour: this.getHeaderColour(this.props.PriorityID)
            });
        } else if (this.props.IsResolved == 1){
            this.setState({
                resolveText: "Open",
                headerColour: {backgroundColor:"#30a64a"}
            });
        } else {
            this.setState({
                resolveText: "Resolve",
                headerColour: this.getHeaderColour(this.props.PriorityID)
            });
        }
        this.updateCommentList();
    }


    // Green 30a64a
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


    updateCommentList(){
        let newList = this.generateCommentList();
        this.setState({
            commentList: newList
        });
    }

    generateCommentList(){
        let commentsList = []
        for (let commentCount = 0; commentCount < this.props.comments.length; commentCount++){
            let commentRow = this.props.comments[commentCount];
            if (commentRow.IssueID == this.props.IssueID){
                console.log("Got good comment!");
                commentsList.push(<ListGroupItem key={"Comment " + commentCount + " IssueID " + this.props.IssueID}>{this.props.comments[commentCount].Message}</ListGroupItem>);
            };
        };

        return commentsList;
    }


    onDeleteButtonClick(event){
        this.props.deleteIssueFromGrid(this.props.IssueID);
    }

    onResolveButtonClick(event){
        this.props.updateIsResolvedFromGrid(this.props.IssueID, this.props.IsResolved);
    }

    onAddCommentButtonClick(event){
        event.preventDefault();
        console.log(event);

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
                <CardHeader className="text-center" style={this.state.headerColour}>{this.props.IssueName}</CardHeader>
                <CardBody className="text-center">
                    <CardSubtitle className="pb-2">{"Project: " + this.props.ProjectName}</CardSubtitle>
                    <CardSubtitle className="pb-5">{"Created by: " + ((this.props.AssigneeUsername).charAt(0).toUpperCase() + (this.props.AssigneeUsername).slice(1)) + " assigned to: " + ((this.props.AssignedToUsername).charAt(0).toUpperCase() + (this.props.AssignedToUsername).slice(1))}</CardSubtitle>
                    <CardText style={{minHeight:"15vmin", color:"black", "font-style": "normal", "font-size": "16px"}}>{this.props.Summary}</CardText>
                    <CardText>
                        <small id="lastupdate" style={{color:"grey","font-style": "normal"}}>Last updated {moment(this.props.LastUpdate).format('YYYY-MM-DD HH:mm:ss')}</small>
                    </CardText>
                </CardBody>

                <Row>
                    <Col xs={{ size: 4}}>
                        <Button id={"Popover" + this.props.IssueID} key={"Comment" + this.props.IssueID} type="button">
                          Note <Badge color="secondary" className="text-sm-right">{this.state.commentList.length}</Badge>
                        </Button>
                    </Col>
                    <Col xs={{ size: 4}}>
                        <Button color="success" onClick={this.onResolveButtonClick} key={"Resolve" + this.props.IssueID}>{this.state.resolveText}</Button>
                    </Col>
                    <Col xs={{ size: 4}}>
                        <Button color="danger" onClick={this.onDeleteButtonClick} key={"Delete" + this.props.IssueID}>Delete</Button>
                    </Col>
                </Row>

                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"Popover" + this.props.IssueID} toggle={this.toggle}>
                  <PopoverBody styles={{"textAlign":"center"}}>
                    <ListGroup flush styles={{"textAlign":"center"}} key={"Comments List group Issue ID " + this.props.IssueID}>
                        <ListGroupItem>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button onClick={this.onAddCommentButtonClick} aria-describedby="commentText" style={{height:'30px',width:'40px', padding:'0px', margin:'0px'}}>Add</Button>
                                </InputGroupAddon>
                                <Input id="commentText" class="form-control" type="text" placeholder="Comment"/>
                            </InputGroup>
                        </ListGroupItem>
                        {this.state.commentList}
                    </ListGroup>
                  </PopoverBody>
                </Popover>
            </Card>
        );
    }
};
