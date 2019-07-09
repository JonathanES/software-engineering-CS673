import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/group-chat.css'

const mapStateToProps = state => ({
    addGroup: state.message.addGroup
});

class AddGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            playlistName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "playlistName":
                this.setState({ playlistName: event.target.value });
                break;
            default:
                break;
        }
    }
    handleSubmit(event) {
        this.props.dispatch({ type: 'USER_ADD_GROUP_DEMAND' });
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add GroupChannel</h4>
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