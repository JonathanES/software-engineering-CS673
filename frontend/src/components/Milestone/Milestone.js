import React from "react";
import { connect } from 'react-redux';
import { getListOfMilestones } from '../../socket/milestoneSocket';
//import {userId} from '../../socket/userSocket';
import MilestoneUpdate from './milestoneUpdate';
//import '../../css/milestoneMilestone.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    updateMilestone: state.milestone.updateMilestone,
    milestone: state.milestone.milestone
});

class Milestone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            milestoneList: [],
            createMilestone: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {

        getListOfMilestones(1, (err, data) => {
          console.log(data);
            this.setState({ milestoneList: data });
        });
    }

    handleChange(event) {
        this.setState({ createMilestone: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handleSubmit(event) {
        console.log('Add Milestone button pressed before call');

        this.props.dispatch({ type: 'USER_ADD_MILESTONE_DEMAND' });

//         dispatch: <milestoneForm  dispatch={this.props.dispatch}/>;

/*         createMilestone(this.state.userId, this.state.createMilestone, (err, data) => {
             console.log('Add milestone button pressed');
             this.setState({ createMilestone: data });
             console.log("inside handleSubmit");

         }) */
        event.preventDefault();
    }

    handleClick(e,milestone){
        console.log('Calling Milestone Update');
        this.props.dispatch({type:'USER_UPDATE_MILESTONE_DEMAND', milestone:milestone});
    }
render() {
    return (
      <div>
                      <div class="milestone">
                          <ul>
                              {this.state.milestoneList.map(milestone =>
                                  <li style={{display:"inline block",backgroundColor:'white',
                                  borderRadius:"50"}}>
                                      <li id={milestone.MilestoneID} onClick={(e) => {
                                          this.handlePictureClick(milestone); e.preventDefault()
                                      }}></li>
                                      <div>
                                          <span id={milestone.MilestoneID} onClick={(e) => {this.handlePictureClick( milestone); e.preventDefault()}}
                                          class="milestone-content">{milestone.MilestoneName}</span>
                                      </div>
                                      {<li class="updatebtn" id={milestone.MilestoneID} onClick={(e) => this.handleUpdateClick(milestone)}> </li>}
                                  </li>
                              )}

                          </ul>
                          {this.props.isMilestoneSelected &&
                              <form onClick={this.handleClick}>
                                  <button id="add-milestone-button" class="addmilestonebtn" onClick={(e) => this.handleClick(e)}>Add Milestone</button>
                              </form>
                          }
                      </div>

                      </div>
                    );
}
}

export default connect(mapStateToProps)(Milestone);
