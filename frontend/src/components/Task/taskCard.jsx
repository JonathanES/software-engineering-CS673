import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter } from 'reactstrap';


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
class TaskCard {
    constructor(taskRowObject){
        this.username = taskRowObject.username;
        this.taskName = taskRowObject.taskName;
        this.taskInfo = taskRowObject.taskInfo;
        this.dueDate = taskRowObject.dueDate;
        this.priorityID = taskRowObject.priorityID;
        this.buttonText = "Update";
    }

    blueCard(taskName, title, taskInfo, buttonText, username, dueDate){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor: "#157ffb"}}>{taskName}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardText>{taskInfo}</CardText>
                    <Button color="secondary">{buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Due Date: {dueDate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {username} </CardFooter>
            </Card>
        );
    }

    yellowCard(taskName, title, taskInfo, buttonText, username, dueDate){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor: "#fdc02f"}}>{taskName}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardText>{taskInfo}</CardText>
                    <Button color="secondary">{buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Due Date: {dueDate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {username} </CardFooter>
            </Card>
        );
    }

    redCard(taskName, title, taskInfo, buttonText, username, dueDate){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor: "#d63648"}}>{taskName}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardText>{taskInfo}</CardText>
                    <Button color="secondary">{buttonText}</Button>
                    <CardText>
                        <small className="text-muted">Due Date: {dueDate}</small>
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">Assigned to: {username} </CardFooter>
            </Card>
        );
    }

    getCard(){
        if (this.priorityID == 1){
            return(this.blueCard(this.taskName, this.priorityID, this.taskInfo, "Update", this.usernameD, this.dueDate));

        }else if(this.priorityID == 2){
            return(this.yellowCard(this.taskName, this.priorityID, this.taskInfo, "Update", this.usernameD, this.dueDate));

        }else if(this.priorityID == 3){
            return(this.redCard(this.taskName, this.priorityID, this.taskInfo, "Update", this.usernameD, this.dueDate));
        }
    }

    updateTaskName(){

    }

};

export default TaskCard;