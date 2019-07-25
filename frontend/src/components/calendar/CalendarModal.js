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
    }

    render() {
        return (
            <div id="myModal" class="modal-fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={this.handleSubmit}>&times;</button>
                            <h4 class="modal-title">{moment(this.props.task[0].dueDate).format('DD-MM-YY')}</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div id="delete-user-group">
                            <div id="delete-user-group-title">Users that are in the group</div>
                                {
                                    this.props.taskOfDay.map(task =>
                                        <div>
                                            {task.taskName}
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