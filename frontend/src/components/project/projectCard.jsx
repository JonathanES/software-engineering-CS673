import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter } from 'reactstrap';


const whiteCard = (header, title, buttonText) => {
    return(
        <Card body>
            <CardBody className="text-center">
                <CardTitle>{title}</CardTitle>
                <CardImg top width="100%" src="../../images/projectbackground.png" alt="Card image cap"  /> 
                <Button color="secondary">{buttonText}</Button>
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
