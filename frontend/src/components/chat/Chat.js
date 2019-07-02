import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { sendMessage, getMessage } from '../../socket/messagingSocket'
import { getFriends } from '../../socket/userSocket'
import '../../css/message.css'

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
            receiverId: '',
            receiverName: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        let receiverName = "";
        listOfFriends.forEach(elt => {
            if (elt.userId == event.target.id) {
                elt.color = "red";
                receiverName = elt.username;
            }
            else
                elt.color = "black";
        })
        getMessage(this.state.userId, event.target.id, (err, data) => {
            data.forEach(elt => {
                if (elt.receiverId == this.state.receiverId)
                    elt.position = "right";
                else
                    elt.position = "left";

            })
            this.setState({ chatHistory: data })
        })
        this.setState({ listOfFriends: listOfFriends, receiverId: event.target.id, receiverName: receiverName });
    }

    render() {
        return (
            <div class="box">
                <div class="leftbar">
                    <ul>
                        <li><i class="fas fa-user"></i></li>
                        <li><i class="fas fa-user-circle"></i></li>
                        <li><i class="fas fa-wrench"></i></li>
                        <li><i class="fas fa-folder-open"></i></li>
                        <li><i class="fas fa-bell"></i></li>
                        <li><i class="fas fa-envelope"></i></li>
                        <li><i class="fas fa-power-off"></i></li>
                    </ul>
                </div>
                <div class="container">
                    <div class="chatbox">
                        <div class="chatleft">
                            <div class="top">
                                <i class="fas fa-bars" style={{"font-size": "1.4em"}}></i>
                                <input type="text" class="search-chatleft" placeholder="search"/>
                                <button class="searchbtn"><i class="fas fa-search"/></button>
                            </div>
                            <div class="center">
                                <ul>
                                    {this.state.listOfFriends.map(friend =>
                                        <li style={{ color: friend.color }}>
                                            <img class="pic-user-left" src="http://placehold.it/40x40" />
                                            <span class="span-user-left" id={friend.userId} onClick={this.handleClick}>{friend.username}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div class="chatright">
                            <div class="top">
                                <img class="pic-user-right" src="http://placehold.it/40x40" />
                                <span class="username-right">{this.state.receiverName}</span>
                            </div>
                            <div>
                                <ul>
                                    {this.state.chatHistory.map(chat =>
                                        <div class="chat-position-right" align={chat.position}>
                                            <li >
                                                {chat.senderName}: {chat.Message}
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>
                            <div class="footer">
                                <form onSubmit={this.handleSubmit}>
                                    <input id="message-box" type="text" value={this.state.message} onChange={this.handleChange} />
                                    <button class="sendbtn" type="submit">SEND</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);