import React from 'react';
import MilestoneList from "./milestoneList.jsx";
import MilestoneCreationForm from "./milestoneCreationForm.jsx"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames'

import { createMilestone } from "../../socket/milestoneSocket.js";

export class MilestoneFormat extends React.Component {
  constructor(props, milestone) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.milestoneCreation = this.milestoneCreation.bind(this);

    this.state = {
      activeTab: 'mile_tab_1',
      milestones: {},
      projectID: 1
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        //  milestone:milestone
      });
    }
  }

  milestoneCreation(projectId, milestoneName, date){
    this.setState({activeTab: 'mile_tab_1', projectID: projectId});
    createMilestone(projectId, milestoneName, date, this.toggle(this.state.activeTab))
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
                <MilestoneList projectID={this.props.projectID}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="mile_tab_2">
            <div>
              <MilestoneCreationForm milestoneCreation={this.milestoneCreation}/>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
