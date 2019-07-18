import React, { Component } from 'react';
import IssueCard from "./issuecard.jsx"

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId,
  //taskname: state.Task.newtask
});

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      id_user: '',
    };
  }


 render() {
    return (
      <div>
          <h1>Test Header</h1>
          <IssueCard/>
      </div>
    );
  }
}

export default Issues;
