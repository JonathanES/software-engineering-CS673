import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter } from 'reactstrap';


const whiteCard = (header, title, text, buttonText, assignedTo, assignee, lastUpdate) => {
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

const yellowCard = (header, title, text, buttonText, assignedTo, assignee, lastUpdate) => {
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

const redCard = (header, title, text, buttonText, assignedTo, assignee, lastUpdate) => {
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


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
const IssueCard = (issueRowObject) => {
    console.log(issueRowObject)// Consts are like classes but faster?
    // Unpack object in the order it is in the database row
    const {IssueID, ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved, IsDeleted} = issueRowObject;

    if (issueRowObject.PriorityID == 1){
        return(whiteCard(IssueName, PriorityID, Summary, "Test Button", AssignedToID, AssigneeID, LastUpdate));

    }else if(issueRowObject.PriorityID == 2){
        return(yellowCard(IssueName, PriorityID, Summary, "Test Button", AssignedToID, AssigneeID, LastUpdate));

    }else if(issueRowObject.PriorityID == 3){
        return(redCard(IssueName, PriorityID, Summary, "Test Button", AssignedToID, AssigneeID, LastUpdate));
    }
};

export default IssueCard;
