import React, { Component } from 'react';

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
        <h2> I love Clement</h2> 
      </div>
    );
  }
}

export default Issues;