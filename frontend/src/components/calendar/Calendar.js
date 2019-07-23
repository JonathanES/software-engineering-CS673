import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
 
const mapStateToProps = state => ({    
});

class CalendarComponent extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CalendarComponent);
