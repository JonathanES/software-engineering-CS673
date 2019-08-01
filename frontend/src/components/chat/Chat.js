import React from "react";
import { connect } from "react-redux";
import { sendMessage, getMessage } from "../../socket/messagingSocket";
import {
  getUserGroups,
  getGroupMessage,
  sendGroupMessage
} from "../../socket/GroupMessagingSocket";
import AddGroup from "./AddGroup";
import AddUserGroup from "./AddUserGroup";
import { getFriends } from "../../socket/userSocket";
import "../../css/message.css";

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  addGroup: state.message.addGroup,
  listOfGroups: state.message.listOfGroups,
  addUserToGroup: state.message.addUserToGroup
});

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
      username: props.username,
      message: "",
      chatHistory: [],
      listOfFriends: [],
      receiverId: "",
      receiverName: "",
      listOfGroups: [],
      groupId: "",
      isGroupDiscussion: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
  }

  componentDidUpdate() {
    this.onScroll();
    if (this.props.listOfGroups)
      if (this.state.listOfGroups.length < this.props.listOfGroups.length)
        this.setState({ listOfGroups: this.props.listOfGroups });
  }

  componentDidMount() {
    getFriends(this.state.userId, (err, data) => {
      data.forEach(elt => {
        elt.isadd = "false";
        elt.color = "rgb(155, 121, 156)";
      });
      this.setState({ listOfFriends: data });
    });

    getUserGroups(this.state.userId, (err, data) => {
      this.setState({ listOfGroups: data });
      this.props.dispatch({
        type: "USER_GET_GROUPS_DEMAND",
        listOfGroups: data
      });
    });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }
  onScroll() {
    const { clientHeight, scrollHeight, scrollTop } = this.scrollDom;
    const isBottom = clientHeight + scrollTop === scrollHeight;
    if (!isBottom) {
      this.scrollDom.scrollTop = scrollHeight;
    }
    console.log(
      clientHeight,
      scrollHeight,
      scrollTop,
      isBottom,
      this.scrollDom
    );
  }
  handleSubmit(event) {
    if (!this.state.isGroupDiscussion) {
      const history = this.state.chatHistory;
      history.push({
        senderId: this.state.userId,
        receiverId: this.state.receiverId,
        Message: this.state.message,
        senderName: this.state.username,
        receiverName: this.state.receiverName
      });
      history.forEach(elt => {
        if (elt.receiverId == this.state.receiverId) elt.position = "right";
        else elt.position = "left";
      });
      this.setState({ chatHistory: history, message: "" });
      sendMessage(
        this.state.userId,
        this.state.receiverId,
        this.state.message,
        (err, data) => {
          this.setState({ message: "" });
        }
      );
    } else {
      sendGroupMessage(
        this.state.userId,
        this.state.receiverId,
        this.state.message,
        (err, data) => {
          this.setState({ message: "" });
        }
      );
    }
    event.preventDefault();
    this.onScroll();
  }

  handleClick(event) {
    const listOfFriends = this.state.listOfFriends;
    let receiverName = "";
    listOfFriends.forEach(elt => {
      if (elt.userId == event.currentTarget.id) {
        elt.color = "red";
        elt.isadd = "true";
        receiverName = elt.username;
      } else elt.isadd = "false";
      elt.color = "rgb(155, 121, 156)";
    });
    if (event.currentTarget.id)
      this.setState({
        listOfFriends: listOfFriends,
        receiverId: event.currentTarget.id,
        receiverName: receiverName,
        isGroupDiscussion: false
      });
    getMessage(this.state.userId, event.currentTarget.id, (err, data) => {
      data.forEach(elt => {
        if (elt.receiverId == this.state.receiverId) elt.position = "right";
        else elt.position = "left";
      });
      if (data.length > 0) {
        if (
          data[0].receiverId == this.state.receiverId ||
          data[0].senderId == this.state.receiverId
        )
          this.setState({ chatHistory: data });
      } else {
        this.setState({ chatHistory: [] });
      }
    });
  }

  handleGroupClick(event) {
    const listOfGroups = this.state.listOfGroups;
    let receiverName = "";
    listOfGroups.forEach(elt => {
      if (elt.GroupID == event.currentTarget.id) {
        elt.color = "red";
        elt.isadd = "true";
        receiverName = elt.GroupName;
      } else elt.isadd = "false";
      elt.color = "rgb(155, 121, 156)";
    });
    if (event.currentTarget.id)
      this.setState({
        receiverId: event.currentTarget.id,
        receiverName: receiverName,
        isGroupDiscussion: true
      });
    getGroupMessage(event.currentTarget.id, (err, data) => {
      if (data.length > 0) {
        if (data[0].groupID == this.state.receiverId)
          this.setState({ chatHistory: data });
      } else {
        this.setState({ chatHistory: [] });
      }
      this.setState({ chatHistory: data });
    });
  }

  render() {
    return (
      <div class="container">
        <div class="chatbox">
          {this.props.addGroup && <AddGroup dispatch={this.props.dispatch} />}
          {this.props.addUserToGroup && <AddUserGroup />}
          <div class="chatleft">
            <div class="top">
              <div class="appname">SwelloDesk</div>
              <div class="personalname">
                {/* <div class="yuan yuanselect"></div> */}
                <div class="charlefttext">{this.state.username}</div>
              </div>
            </div>
            <div class="center">
              {/* group message */}
              <div class="channel">
                <div class="title">
                  Channels
                  <input
                    class="add_task_button"
                    type="image"
                    style={{ width: "20%", height: "50%" }}
                    src={require("../../images/plus.svg")}
                    onClick={e => {
                      this.props.dispatch({ type: "USER_ADD_GROUP_DEMAND" });
                      e.preventDefault();
                    }}
                  />
                </div>
                <ul>
                  {this.state.listOfGroups.map(group => (
                    <li>
                      <div
                        class="personalname"
                        id={group.GroupID}
                        onClick={this.handleGroupClick}
                      >
                        <div class="channellogo">#</div>
                        <div class="charlefttext">
                          <span class="span-user-left">{group.GroupName}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* direct message */}
              <div class="direct">
                <div class="title">Direct Message</div>
                <ul>
                  {this.state.listOfFriends.map(friend => (
                    <li>
                      <div
                        class="personalname"
                        id={friend.userId}
                        onClick={this.handleClick}
                      >
                        <div
                          className={
                            friend.isadd == "true" ? "yuan yuanselect" : "yuan"
                          }
                        />
                        <div class="charlefttext">
                          <span class="span-user-left">{friend.username}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div class="chatright">
            <div class="top">
              <div class="top-left">
                <img
                  class="pic-user-right"
                  src="http://placehold.it/40x40"
                  class="userhead"
                />
                <span class="username-right">{this.state.receiverName}</span>
              </div>
              <div class="top-right">
                <input
                  type="text"
                  class="search-chatleft"
                  placeholder="search"
                />
                <button class="searchbtn">
                  <i class="fas fa-search" />
                </button>
                {this.state.isGroupDiscussion && (
                  <input
                    id="add-user-in-group-button"
                    type="image"
                    src={require("../../images/plus-black.svg")}
                    onClick={e => {
                      this.props.dispatch({
                        type: "USER_ADD_USER_TO_GROUP_DEMAND",
                        groupId: this.state.receiverId
                      });
                      e.preventDefault();
                    }}
                  />
                )}
              </div>
            </div>
            <div>
              <ul class="chaton" ref={e => (this.scrollDom = e)}>
                {this.state.chatHistory.map(chat => (
                  <div class="chat-position-right" align={chat.position}>
                    <li
                      className={
                        chat.position == "right"
                          ? "chatli chatli-right"
                          : "chatli"
                      }
                    >
                      <div
                        className={
                          chat.position == "left"
                            ? "chatlileft show chatlileft-left"
                            : "chatlileft"
                        }
                      >
                        <img src="http://placehold.it/40x40" class="userhead" />
                      </div>
                      <div class="chatliright">
                        <span class="senderName">{chat.senderName}</span>
                        <span class="sendMessage">{chat.Message}</span>
                      </div>
                      <div
                        className={
                          chat.position == "right"
                            ? "chatlileft show chatlileft-right"
                            : "chatlileft"
                        }
                      >
                        <img src="http://placehold.it/40x40" class="userhead" />
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
              <div class="footer">
                <form onSubmit={this.handleSubmit}>
                  <input
                    id="message-box"
                    type="text"
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                  <button class="sendbtn" type="submit">
                    SEND
                  </button>
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
