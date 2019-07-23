import React, { Component } from 'react';
import '../../css/main.css'
import { connect } from 'react-redux';
import { Link} from "react-router-dom";


import { updatePassword } from '../../socket/userSocket';

const mapStateToProps = state => ({
});

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "password-confirmation":
        this.setState({ passwordConfirmation: event.target.value });
        break;
      default:
        break;
    }
  }

  
  handleSubmit(event) {
    updatePassword(this.state.email, this.state.password, (err, data) => {
     window.location.pathname = "/";
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="window login">
          <div className="window-header">
            <h1 className="uppercase"> Update password </h1>
          </div>
          <div className="window-contain">
            <div className="form-group">
              <form onSubmit={this.handleSubmit}>
                <div className="form-field">
                  <label htmlFor="email">Email :</label>
                  <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password :</label>
                  <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password-confirmation">Confirmation :</label>
                  <input id="password-confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn uppercase">Update password</button>
              </form>
            </div>
            <p className="account-help">You already have an account ? <a onClick={this.handleClick} className="underline red" >Login</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UpdatePassword);
