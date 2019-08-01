import React from 'react';
import MilestoneBasic from "./milestoneBasic.jsx";
import {ListGroup, ListGroupItem} from 'reactstrap';

import {getListOfMilestones} from "../../socket/milestoneSocket.js";

  export default class MilestoneList extends React.Component{
    constructor(props){
      super(props);

      this.handleGotMilestones = this.handleGotMilestones.bind(this);

      this.state = {
        //milestones:this.props.milestones,
        list:""
      };
}
    generateList(data){
      let newList = [];
      for(let mcount=0; mcount< data.length; mcount++){
        newList.push(
          <ListGroupItem disabled tag="a" href="#">data[mcount].milestoneName</ListGroupItem>

        )

      }
      return newList;
    }


    componentDidMount(){
      getListOfMilestones(this.handleGotMilestones);
    }

    handleGotMilestones(data){
      this.updateList(data);
    }

    updateList(){
      let newList = this.generateList();
      this.setState({
        list: newList
      });
    }
render(){
  return(
    this.state.list
  )
}



  }
