import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/group-chat.css'
import {createGroup} from '../../socket/GroupMessagingSocket';

const mapStateToProps = state => ({
    addGroup: state.message.addGroup,
    userId: state.user.userId
});

class AddGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            groupName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        createGroup(this.state.groupName, this.props.userId, (err, data) => {
            this.props.dispatch({ type: 'USER_ADD_GROUP_DEMAND' });
            this.props.dispatch({ type: 'USER_GET_GROUPS_DEMAND', listOfGroups: data });
        })

        event.preventDefault();
    }
    render() {
        return (
            <div>
                <div id="myModal" class="modal-fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" onClick={this.handleSubmit}>&times;</button>
                                <h4 class="modal-title">Add Group Channel</h4>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <input id="message-box" type="text" value={this.state.message} onChange={this.handleChange} />
                                <button class="submit" type="submit">Submit</button>
                                <div class="modal-body">
                                    <p>Some text</p>
                                </div>
                                <div class="modal-footer">
                                    <button  type="submit" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddGroup);