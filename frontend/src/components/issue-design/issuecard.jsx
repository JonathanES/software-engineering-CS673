import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter } from 'reactstrap';


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
class IssueCard {
    constructor(issueRowObject){
        this.issueName =     issueRowObject.IssueID;
        this.priorityID =    issueRowObject.PriorityID;
        this.issueStatusID = issueRowObject.IssueStatusID;
        this.assigneeID =    issueRowObject.AssigneeID;
        this.assignedToID =  issueRowObject.AssignedToID;
        this.priorityID =    issueRowObject.PriorityID;
        this.issueName =     issueRowObject.IssueName;
        this.summary =       issueRowObject.Summary;
        this.dateCreated =   issueRowObject.DateCreated;
        this.lastUpdate =    issueRowObject.LastUpdate;
        this.dateResolved =  issueRowObject.DateResolved;
        this.isResolved =    issueRowObject.IsResolved;
        this.IsDeleted =     issueRowObject.IsDeleted;
    }

    whiteCard(header, title, text, buttonText, assignedTo, assignee, lastUpdate){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor: "#157ffb"}}>{header}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardText>{text}</CardText>
                    <Button color="secondary">{buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Last updated {lastUpdate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {assignedTo} by {assignee}</CardFooter>
            </Card>
        );
    }

    yellowCard(header, title, text, buttonText, assignedTo, assignee, lastUpdate){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor: "#fdc02f"}}>{header}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardText>{text}</CardText>
                    <Button color="secondary">{buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Last updated {lastUpdate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {assignedTo} by {assignee}</CardFooter>
            </Card>
        );
    }

    redCard(header, title, text, buttonText, assignedTo, assignee, lastUpdate){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor: "#d63648"}}>{header}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardText>{text}</CardText>
                    <Button color="secondary">{buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Last updated {lastUpdate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {assignedTo} by {assignee}</CardFooter>
            </Card>
        );
    }

    getCard(){
        if (this.priorityID == 1){
            return(this.whiteCard(this.issueName, this.priorityID, this.summary, "Test Button", this.assignedToID, this.assigneeID, this.lastUpdate));

        }else if(this.priorityID == 2){
            return(this.yellowCard(this.issueName, this.priorityID, this.summary, "Test Button", this.assignedToID, this.assigneeID, this.lastUpdate));

        }else if(this.priorityID == 3){
            return(this.redCard(this.issueName, this.priorityID, this.summary, "Test Button", this.assignedToID, this.assigneeID, this.lastUpdate));
        }
    }

    updateIssueName(){

    }

};

export default IssueCard;
