import React from 'react';
import MilestoneList from "./milestoneList.jsx";
import MilestoneCreationForm from "./milestoneCreationForm.jsx"
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col} from 'reactstrap';
import classnames from 'classnames'

import {getListOfMilestones} from "../../socket/milestoneSocket.js";

  export class MilestoneFormat extends React.Component{
    constructor(props,milestone){
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
          activeTab:'mile_tab_1',
          milestoneCreationForm: this.props.milestoneCreationForm,
          milestones: {}
      };
    }
    toggle(tab){
      if(this.state.activeTab !== tab){
        this.setState({
          activeTab:tab,
        //  milestone:milestone
        });
      }
    }
/*    create(milestone){
      if(this.state.milestoneCreationForm!==milestone){
       this.setState({
         milestoneCreationForm:milestone
       });
      }
    }*/
    render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'mile_tab_1' })}
              onClick={() => { this.toggle('mile_tab_1'); }}
            >
              View Milestones
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'mile_tab_2' })}
              onClick={() => { this.toggle('mile_tab_2'); }}
            >
              Create Milestone
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="mile_tab_1">
            <Row>
              <Col sm="12">
                <h4>Current Milestones</h4>
                <MilestoneList/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="mile_tab_2">
          <div>
      insert stuff here
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
