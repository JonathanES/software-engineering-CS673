import React, { Component } from 'react';
import '../../css/main.css'
import { passwordForgotten } from '../../socket/userSocket';


class PasswordForgotten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      id_user: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.dispatch({ type: 'USER_REGISTER_DEMAND' })
  }

  handleChange(event) {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      default:
        break;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    passwordForgotten(this.state.email);
  }

  render() {
    return (
      <div className="window">
        <div className="window-header">
          <h1 > Password forgotten? </h1>
        </div>
        <div className="window-contain">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="form-field">
                <label htmlFor="email">Email :</label>
                <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
              </div>
              <button className="btn uppercase" type="submit">Submit</button>
            </div>
            <p className="account-help">You do not have an account ? <a onClick={this.handleClick} className="underline red" >Register</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordForgotten;
