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
                elt.isadd='false'
                elt.color = "rgb(155, 121, 156)";
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
                elt.isadd='true'
                receiverName = elt.username;
            }
            else
                elt.isadd='false'
                elt.color = "rgb(155, 121, 156)";
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
                {/* <div class="leftbar">
                    <ul>
                        <li><i class="fas fa-user"></i></li>
                        <li><i class="fas fa-user-circle"></i></li>
                        <li><i class="fas fa-wrench"></i></li>
                        <li><i class="fas fa-folder-open"></i></li>
                        <li><i class="fas fa-bell"></i></li>
                        <li><i class="fas fa-envelope"></i></li>
                        <li><i class="fas fa-power-off"></i></li>
                    </ul>
                </div> */}
                <div class="container">
                    <div class="chatbox">
                        <div class="chatleft">
                            <div class="top">
                                {/* <i class="fas fa-bars" style={{"font-size": "1.4em"}}></i>
                                <input type="text" class="search-chatleft" placeholder="search"/>
                                <button class="searchbtn"><i class="fas fa-search"/></button> */}
                                <div class="appname">
                                  SwelloDesk
                                </div>
                                <div class="personalname">
                                  <div class="yuan yuanselect"></div>
                                  <div class="charlefttext">
                                   Yuanping Yao
                                  </div>
                                </div>
                            </div>
                           <div class="center">
                               {/* group message */}
                           <div class="channel">
                           <div class="title">Channels</div>
                                <ul>
                                    <li>
                                   <div class="personalname">
                                  <div class="channellogo">#</div>
                                  <div class="charlefttext">
                                  <span class="span-user-left">general</span>
                                  </div>
                                </div>
                                    </li>
                                    <li>
                                   <div class="personalname">
                                  <div class="channellogo">#</div>
                                  <div class="charlefttext">
                                  <span class="span-user-left">frontend</span>
                                  </div>
                                </div>
                                    </li>
                                    <li>
                                   <div class="personalname">
                                  <div class="channellogo">#</div>
                                  <div class="charlefttext">
                                  <span class="span-user-left">backend</span>
                                  </div>
                                </div>
                                    </li>
                                    <li>
                                   <div class="personalname">
                                  <div class="channellogo">#</div>
                                  <div class="charlefttext">
                                  <span class="span-user-left">usefuldocs</span>
                                  </div>
                                </div>
                                    </li>
                                </ul>
                                </div>
                               {/* direct message */}
                               <div class="direct">
                                   <div class="title">Direct Message</div>
                                <ul>
                                    {this.state.listOfFriends.map(friend =>
                                        <li>
                                            <div class="personalname" id={friend.userId} onClick={this.handleClick}>
                                                <div className={friend.isadd == "true" ? "yuan yuanselect" : "yuan"}></div>
                                                <div class="charlefttext">
                                                    <span class="span-user-left">{friend.username}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div class="chatright">
                            <div class="top">
                                <div class="top-left">
                                <img class="pic-user-right" src="http://placehold.it/40x40" class="userhead"/>
                                <span class="username-right">{this.state.receiverName}</span>
                                </div>
                                <div class="top-right">
                                <input type="text" class="search-chatleft" placeholder="search"/>
                                <button class="searchbtn"><i class="fas fa-search"/></button>
                                 </div>   
                            </div>
                            <div>
                                <ul class="chaton">
                                    {this.state.chatHistory.map(chat =>
                                        <div class="chat-position-right" align={chat.position}>
                                            <li className={chat.position=="right"?"chatli chatli-right":"chatli"}>
                                            <div className={chat.position=="left"?"chatlileft show chatlileft-left":"chatlileft"}>
                                                <img src="http://placehold.it/40x40" class="userhead"></img>
                                            </div>        
                                                <div class="chatliright">
                                                <span class="senderName">{chat.senderName}</span>
                                                <span class="sendMessage">{chat.Message}</span>
                                                </div>
                                                <div className={chat.position=="right"?"chatlileft show chatlileft-right":"chatlileft"}>
                                                <img src="http://placehold.it/40x40" class="userhead"></img>
                                            </div>       
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
        