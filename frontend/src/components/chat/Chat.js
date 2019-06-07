import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { sendMessage, getMessage } from '../../socket/userSocket'

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user
});

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_user: props.id_user,
            username: props.username,
            message: '',
            chatHistory: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.socket = io('http://localhost:8000');

        this.socket.on('SEND_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ chatHistory: data });
        }
    }

    componentDidMount() {
        getMessage();
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSubmit(event) {
        sendMessage(this.state.username, this.state.message, (err, data) => {
            this.setState({ chatHistory: data });
        })
        event.preventDefault();
    }
    render() {
        return (
            <div id="chatroom-discussion">
                {this.state.chatHistory.map(chat =>
                    <li>
                        {chat.username}: {chat.message}
                    </li>
                )}
                <form onSubmit={this.handleSubmit}>
                    <input id="chatroom-discussion-input" type="text" value={this.state.message} onChange={this.handleChange} />
                    <button id="chatroom-discussion-button" type="submit">SEND</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);