import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardFooter, Popover, PopoverHeader, PopoverBody} from 'reactstrap';


// ProjectID, IssueStatusID, AssigneeID, AssignedToID, PriorityID, IssueName, Summary, DateCreated, LastUpdate, DateResolved, IsResolved
export default class MilestoneBasic extends React.Component{
    constructor(props){
        super(props);
        // Always bind these once, since otherwise React will keep making new functions with every bind
        this.onButtonClick = this.onButtonClick.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            header: this.props.milestoneName,
      //      title:  this.props.AssigneeID,
        //    text:   this.props.Summary,
          ////  buttonText: "Test Button",
          //  popoverOpen: false
        }
    }

    // componentWillUnmount(){
    //     // AppStore.removeChangeListener(this.onButtonClick);
    //     // AppStore.removeChangeListener(this.onDeleteButtonClick);
    //     // AppStore.removeChangeListener(this.toggle);
    //     window.removeEventListener("onClick", this.onDeleteButtonClick);
    // }


    getHeaderColour(){
            return(
                {backgroundColor:"#157ffb"}
              )
    }


    onButtonClick(){
        let newText = "Test Click!";
        this.setState({
            buttonText: newText
        }, () => {
            console.log(this.props.milestoneID);
        });
    }
    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen},
            () => {
                console.log("Updated popup!");
                console.log(this.props.milestoneID);
            }
        );
    }


// <Button onClick={this.onButtonClick.bind(this)} color="secondary">{this.state.buttonText}</Button>

    render(){
        return(
            <Card body className="text-center" style={{minHeight:"42vmin"}}>
                <CardHeader className="text-center" style={this.getHeaderColour(this.props.milestoneID)}>{this.state.header}</CardHeader>
                <CardBody className="text-center">
                    <CardTitle>{"Created by: " + this.state.title}</CardTitle>
                    <CardText>{this.state.text}</CardText>
                    <Button onClick={this.onButtonClick} color="secondary">{this.state.buttonText}</Button>
                </CardBody>



                        <Button id={"Popover" + this.props.milestoneID} type="button">
                          Comments <Badge color="secondary" className="text-sm-right">4</Badge>
                        </Button>


                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"Popover" + this.props.milestoneID} toggle={this.toggle}>
                  <PopoverHeader>Popover Title</PopoverHeader>
                  <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover>
            </Card>
        );
    }
};
