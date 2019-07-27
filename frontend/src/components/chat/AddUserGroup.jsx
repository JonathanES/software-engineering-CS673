import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/group-chat.css'
import { addUserGroup, getUsersNotInGroup, removeUserGroup } from '../../socket/GroupMessagingSocket';


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
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
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
    handleAddUser = userId => {
        console.log(userId);
        addUserGroup(userId, this.props.groupId, (err, data) => {
            this.setState({ userListInGroup: data.inGroup, userListNotInGroup: data.notInGroup });
        })
    }

    handleRemoveUser = userId => {
        console.log(userId);
        removeUserGroup(userId, this.props.groupId, (err, data) => {
            this.setState({ userListInGroup: data.inGroup, userListNotInGroup: data.notInGroup });
        })
    }
    render() {
        return (
            <div id="myModal" class="modal-fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_ADD_USER_TO_GROUP_DEMAND', groupId: this.state.receiverId }); }}>&times;</button>
                            <h4 class="modal-title">Users in the channel</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div id="delete-user-group">
                            <div id="delete-user-group-title">Users that are in the group</div>
                                {
                                    this.state.userListInGroup.map(user =>
                                        <div>
                                            {user.username}
                                            <input id="delete-user-button" type="image" onClick={(e) => { this.handleRemoveUser(user.userId); e.preventDefault() }} src={require("../../images/delete.svg")} />
                                        </div>
                                    )
                                }
                            </div>
                            <div id="add-user-group">
                            <div id="add-user-group-title">Users that are not in the group</div>
                                {
                                    this.state.userListNotInGroup.map(user =>
                                        <div>
                                            {user.username}
                                            <input id="add-user-button" type="image" src={require("../../images/plus-black.svg")} onClick={(e) => { this.handleAddUser(user.userId); e.preventDefault() }} />
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