/*import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter } from 'reactstrap';


const blueCard = (header, title, text, buttonText, assignedTo, assignee, lastUpdate) => {
    return(
        <Card body inverse color="primary">
            <CardHeader className="text-center">{header}</CardHeader>
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
        <Card body inverse color="warning">
            <CardHeader className="text-center">{header}</CardHeader>
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
        <Card body inverse color="danger">
            <CardHeader className="text-center">{header}</CardHeader>
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


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved)
const IssueCard = (props, projectID, issueStatusID, assigneeID, assignedToID, priorityID, issueName, summary, dateCreated, lastUpdate, dateResolved, isResolved) => { // Consts are like classes but faster?
    if (priorityID == 1){
        return(blueCard(issueName, priorityID, summary, "Test Button", assignedToID, assigneeID, lastUpdate));

    }else if(priorityID == 2){
        return(yellowCard(issueName, priorityID, summary, "Test Button", assignedToID, assigneeID, lastUpdate));

    }else if(priorityID == 3){
        return(redCard(issueName, priorityID, summary, "Test Button", assignedToID, assigneeID, lastUpdate));
    }
};

export default IssueCard;
*/