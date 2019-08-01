import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {createMilestone, getListOfMilestones, getMilestone} from "../../socket/milestoneSocket.js";
import {MilestoneFormat} from './milestoneFormat'

const mapStateToProps = state => ({
  username: state.user.username,
  userID: state.user.userID,
});

class Milestones extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      id_user:'',
      tab:""
    };
  }
  componentDidMount(){
    this.setState({
      tab: <MilestoneFormat
            numberOfTabs={2}
            milestones = {[]}/>
    });
  }
  render(){
    return(
      this.state.tab
    );
  }
}
export default Milestones;
