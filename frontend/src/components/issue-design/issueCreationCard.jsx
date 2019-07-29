import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class IssueCreationCard extends React.Component{
    constructor(props){
        super(props);


    }

    // Green header colour #28A745

    render(){
        return(
            <Card body>
                <CardHeader className="text-center" style={{backgroundColor:"#28A745"}}></CardHeader>
            </Card>
        );
    }

}
