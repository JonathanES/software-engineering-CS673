import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/group-chat.css'
import { addUserGroup, getUsersNotInGroup, removeUserGroup } from '../../socket/GroupMessagingSocket';
import moment from 'moment';


const mapStateToProps = state => ({
    userId: state.user.userId,
    taskOfDay: state.calendar.taskOfDay
});

class AddUserGroup extends Component {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(task) {
        console.log('Calling Task Update');
        this.props.dispatch({ type: 'USER_UPDATE_TASK_DEMAND', task: task });
    }

    render() {
        return (
            <div id="myModal" class="modal-fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_DEMAND_TASK_OF_DAY', taskOfDay: this.props.taskOfDay }); }}>&times;</button>
                            <h4 class="modal-title">{moment(this.props.taskOfDay[0].dueDate).format('DD-MM-YY')}</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div id="view-task">
                                {
                                    this.props.taskOfDay.map(task =>
                                        <div id="task" onClick={(e) => { { this.handleClick(task); e.preventDefault() } }}>
                                            <div id="task-title">
                                                {task.taskName}
                                            </div>
                                            <div id="container">
                                                <div id="left">
                                                    {task.status}
                                                </div>
                                                <div id="center">
                                                    {
                                                        moment.duration(moment(task.dueDate, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays() < 0 ? `You are over the date by ${- moment.duration(moment(task.dueDate, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()} days` : `You have ${moment.duration(moment(task.dueDate, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()} days left`
                                                    }
                                                </div>
                                                <div id="right" className={(task.priorityID == 1) ? "yellow" : (task.priorityID == 2 ? "orange" : "red")}>
                                                    {task.priority}
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-default" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_DEMAND_TASK_OF_DAY', taskOfDay: this.props.taskOfDay }); }}>Close</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddUserGroup);