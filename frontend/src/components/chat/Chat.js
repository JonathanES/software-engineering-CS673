import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { sendMessage, getMessage } from '../../socket/messagingSocket'
import { getFriends } from '../../socket/userSocket'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId
});

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            message: '',
            chatHistory: [],
            listOfFriends: [],
            receiverId: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.socket = io('http://localhost:8000');

        this.socket.on('SEND_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ chatHistory: data });
        }
    }

    componentDidMount() {
        //getMessage();
        getFriends(this.state.userId, (err, data) => {
            data.forEach(elt => {
                elt.color = "black";
            })
            this.setState({ listOfFriends: data });
        });
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSubmit(event) {
        sendMessage(this.state.userId, this.state.receiverId, this.state.message, (err, data) => {
            this.setState({ chatHistory: data });
        })
        event.preventDefault();
    }

    handleClick(event) {
        const listOfFriends = this.state.listOfFriends;
        listOfFriends.forEach(elt => {
            elt.userId == event.target.id ? elt.color = "red" : elt.color = "black";
        })
        getMessage(this.state.userId, event.target.id, (err, data) => {
            this.setState({chatHistory: data})
        })
        this.setState({listOfFriends: listOfFriends, receiverId: event.target.id });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.listOfFriends.map(friend =>
                        <li style={{ color: friend.color }} id={friend.userId} onClick={this.handleClick}>
                            {friend.username}
                        </li>
                    )}
                </div>
                <div id="chatroom-discussion">
                    {this.state.chatHistory.map(chat =>
                        <li>
                            {chat.senderName}: {chat.Message}
                        </li>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <input id="chatroom-discussion-input" type="text" value={this.state.message} onChange={this.handleChange} />
                        <button id="chatroom-discussion-button" type="submit">SEND</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);