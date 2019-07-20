import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/group-chat.css'
import { addUserGroup, getUsersNotInGroup } from '../../socket/GroupMessagingSocket';


const mapStateToProps = state => ({
    addGroup: state.message.addGroup,
    userId: state.user.userId,
    groupId: state.message.groupId
});

class AddUserGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            groupName: '',
            userListNotInGroup: [],
            userListInGroup: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getUsersNotInGroup(this.props.groupId, (err, data) => {
            this.setState({ userListInGroup: data.inGroup, userListNotInGroup: data.notInGroup });
        })
    }

    handleChange(event) {
        switch (event.target.id) {
            case "message-box":
                this.setState({ groupName: event.target.value });
                break;
            default:
                break;
        }
    }
    handleSubmit(event) {
        addUserGroup(this.state.userId, this.state.groupId, (err, data) => {

        })
        event.preventDefault();
    }
    render() {
        return (
            <div id="myModal" class="modal-fade" role="dialog">
                <div class="modal-dialog">

                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={this.handleSubmit}>&times;</button>
                            <h4 class="modal-title">Add Group Channel</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div id="delete-user-group">
                                {
                                    this.state.userListInGroup.map(user =>
                                        <div>
                                            {user.username}
                                            <input id="delete-user-button" type="image" src={require("../../images/delete.svg")} />
                                        </div>
                                    )
                                }
                            </div>
                            <div id="add-user-group">
                                {
                                    this.state.userListNotInGroup.map(user =>
                                        <div>
                                            {user.username}
                                            <input id="add-user-button" type="image" src={require("../../images/plus-black.svg")} onClick={(e) => { this.props.dispatch({ type: 'USER_ADD_GROUP_DEMAND' }); e.preventDefault() }} />
                                        </div>
                                    )
                                }
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-default" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_ADD_USER_TO_GROUP_DEMAND', groupId: this.state.receiverId }); }}>Close</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddUserGroup);