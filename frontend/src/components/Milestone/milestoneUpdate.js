import React from "react";
import { connect } from 'react-redux';
import moment from 'moment'
import {updateMilestoneName, updateMilestoneDate, updateMilestoneCompleted} from '../../socket/milestoneSocket';

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    project: state.project.project,
    projectName: state.project.projectName,
    milestone: state.milestone.milestone,

});
class MilestoneUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            pID: props.project.projectID,
            milestoneID: props.milestone.milestoneID,
            milestoneName: props.milestone.milestoneName,
            dueDate: props.milestone.dueDate,
            isCompleted: props.milestone.isCompleted,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        //this.handlePriorityChange = this.handlePriorityChange.bind(this);
     this.handleCompletedChange = this.handleCompletedChange.bind(this);
  //      this.handleInfoChange = this.handleInfoChange.bind(this);
  //      this.handleActTimeChange = this.handleActTimeChange.bind(this);

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleUpdatemilestone = this.handleUpdatemilestone.bind(this);
//        this.handleDeletemilestone = this.handleDeletemilestone.bind(this);

        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {

        console.log('milestones:', this.props.milestone);

  //      getPriorities((err, data) => {
  //          this.setState({ milestonePriorities: data })
            // console.log(data);
            //this.state.milestonePriorities.push({PriorityID:0,Priority:'Please Select One'});
//        })

        updateMilestoneCompleted((err, data) => {
            this.setState({ milestoneCompleted: data });
            //console.log(data);
            //this.state.milestoneStatus.push({StatusID:4,StatusName:'Please Select One'});
        })
    }

    handleNameChange(newName) {
        this.setState({ milestoneName: newName });
    }

    handleDateChange(newDate) {
        this.setState({ dueDate: newDate });
    }

  /*  handlePriorityChange(e) {
        let selval = parseInt(e.target.value);
        console.log('Priority Selected:',selval);
        //console.log(this.state.milestonePriorities);
        console.log('Priority Change:', selval);
        console.log('Priority Name:',this.state.milestonePriorities[selval-1].Priority)



        if(selval!=''){
            this.setState({ priorityID: selval });
            this.setState({ priority: this.state.milestonePriorities[selval-1].Priority});
        }
    }
*/
    handleCompletedChange(event) {
        let selval = parseInt(event.target.value);
        console.log('Completed Selected:',selval)
        console.log('Completed Change:', selval);
        //console.log(this.state.milestoneStatus);
        console.log('Completed Name:',this.state.milestoneCompleted[selval-1].CompletedName)
        if(selval!=''){
            this.setState({ completedID: selval});
            this.setState({ completed:this.state.milestoneCompleted[selval-1].CompletedName});
        }
        event.preventDefault();
    }
    handleClick(event) {
    }

    handleChangeUser(event) {
    }



    handleNewUser(event) {

        // //console.log('User ID:',event.target.value);
        // this.setState({newuserid: event.target.value});
        // event.preventDefault();
    }

    handleUpdateMilestone(e) {

        // console.log('milestoneName:', this.state.milestoneName);
        // console.log('dueDate:', this.state.dueDate);
        // console.log('priority:', this.state.priorityID);
        // console.log('milestoneInfo:', this.state.milestoneInfo);
        // console.log('statusID:', this.state.statusID);
        // console.log('assignedTo:', this.state.assignedTo)
        // console.log('expDuration:', this.state.expDuration);
        // console.log('actTime:', this.state.actTime);
        e.preventDefault();

        if (this.state.milestoneName != this.props.milestone.milestoneName && this.state.milestoneName != '') {
            // console.log(this.props.milestone.milestoneID);
            // console.log(this.state.milestoneName);
            updateMilestoneName(this.props.milestone.milestoneID, this.state.milestoneName, (err, data) => {
                console.log('New milestone Name:', data);
                const milestone = this.props.milestone;
                milestone.milestoneName = data;
                this.props.dispatch({type:'USER_UPDATE_milestone_DEMAND', milestone: milestone});
            });
        }

        if (this.state.dueDate != this.props.milestone.dueDate && this.state.dueDate != '') {
            // console.log(this.props.milestone.milestoneID);
            // console.log(this.state.dueDate);
            updateMilestoneDate(this.props.milestone.milestoneID, this.state.dueDate, (err, data) => {
                console.log('New Milestone Date:', data);
                const milestone = this.props.milestone;
                milestone.dueDate = data;
                this.props.dispatch({type:'USER_UPDATE_MILESTONE_DEMAND', milestone: milestone});
            });
        }
      }

        render() {
            return (
              <div>put your stuff here</div>
        );
      }

    }
/*
    render() {
        return (
            // <div sytle={{backgroundColor:'black'}}>
            <div sytle={{ backgroundColor: 'black', padding: '20px' }}>
                <div sytle={{ backgroundColor: 'black' }}>
                    <div sytle={{ backgroundColor: 'black' }}></div>

                    <div sytle={{ backgroundColor: 'black', padding: '20px' }}>
                        <button type="button" class="close" onClick={(e) => { this.props.dispatch({ type: 'USER_UPDATE_milestone_DEMAND', milestone: this.props.milestone }); e.preventDefault() }}></button>
                        <h4 sytle={{ backgroundColor: 'black', padding: '20px' }} >Update milestone Information</h4>
                    </div>
                    <div>
                        <label for="milestoneName">milestone Name:</label>
                        <input type="string" id="milestoneName" style={{ textAlign: 'center' }} value={this.state.milestoneName} onChange={(e) => this.handleNameChange(e.target.value)} />
                    </div>
                    <div>
                        <label for="dueDate">Due Date:</label>
                        <input type="date" id="dueDate" style={{ textAlign: 'center' }} className="trip-start" value={moment(this.state.dueDate).format('YYYY-MM-DD')} min="2019-06-01" max="2030-12-31" onChange={(e) => this.handleDateChange(e.target.value)} />
                    </div>
                    <div className="milestoneform-field">
                        <label htmlFor="prioritylevelSelection">Priority of the milestone:</label>
                        <select onChange={(e) => this.handlePriorityChange(e)}>
                            {this.state.milestonePriorities.map(tp => <option selected={tp.PriorityID} value={tp.PriorityID} style={{ textAlign: 'center' }}> {tp.Priority} </option>)}
                        </select>
                    </div>
                    <div className="milestoneform-field">
                        <label htmlFor="statuslevelSelection">Status of the milestone:</label>
                        <select onChange = {(e) => this.handleStatusChange(e)}>
                            {this.state.milestoneStatus.map(ts =>
                            <option selected={ts.StatusName} value={ts.StatusID} className={ts.StatusName} style={{textAlign:'center'}}> {ts.StatusName} </option> )}
                        </select>
                    </div>
                    <div>
                        <label for="milestoneInfoName">milestone Info:</label>
                        <input type="string" id="milestoneInfo"  style={{ textAlign: 'center' }} value={this.state.milestoneInfo} onChange={(e) => this.handleInfoChange(e.target.value)} />
                    </div>
                    <div>
                        <label for="milestoneExpDur">Expected Time to Finish:</label>
                        <span type="numer" id="expDur" style={{ textAlign: 'center' }}> {this.state.expDuration} hours</span>
                    </div>
                    <div>
                        <label for="milestoneActTime">Actual Time Spent on the milestone:</label>
                        <input type="numer" id="actTime" style={{ textAlign: 'center' }} value={this.state.actTime} onChange={(e) => this.handleActTimeChange(e.target.value)} />
                    </div>


                    <form style={{ position: "absolute", padding: '30px' }}>
                        <div class="modal-footer" style={{ marginBottom: '10px' }}>
                            <button class="btn btn-default" style={{ left: '0', width: '140px' }} id="add-cat-button" type="Click"
                                onClick={(e) => this.handleUpdatemilestone(e)} >Update milestone</button>
                            <button type="submit" class="btn btn-default" data-dismiss="modal" style={{ left: '160px', width: '140px' }}
                               onClick={(e) => { if (window.confirm('Are you sure you wish to delete this milestone?')) this.handleDeletemilestone(e) }} >Delete milestone</button>

                            <button type="submit" class="btn btn-default" data-dismiss="modal" style={{ left: '320px', width: '140px' }}
                                onClick={(e) => {this.props.dispatch({ type: 'USER_UPDATE_milestone_DEMAND', milestone: this.props.milestone }); e.preventDefault() }}>Close</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}
*/
export default connect(mapStateToProps)(MilestoneUpdate);
