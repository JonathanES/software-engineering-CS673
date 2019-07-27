import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter } from 'reactstrap';


const image1 = {src:"../images/projectbackground.png"}

const whiteCard = (header, title, buttonText) => {
    return(
        <Card>
            <CardImg top width="20%" src="https://project-management.com/wp-content/uploads/2018/10/what-is-project-management-300x231.jpg" alt="Card image cap" /> 
            <CardBody className="text-center">
                <CardTitle>{title}</CardTitle>
                <Button color="warning">{buttonText}</Button>
            </CardBody>
        </Card>
    );
}


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
const ProjectCard = (projectRowObject) => {
    console.log(projectRowObject)// Consts are like classes but faster?
    // Unpack object in the order it is in the database row
    const {projectID, projectName} = projectRowObject;

    return(whiteCard(projectID, projectName, "Update"));

};

export default ProjectCard;
