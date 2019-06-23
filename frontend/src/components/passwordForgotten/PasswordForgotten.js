import React, { Component } from 'react';
import '../../css/main.css'
import { login } from '../../socket/userSocket';


class PasswordForgotten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    login(this.state.email, this.state.password, (err, data) => {
      console.log(data);
      this.props.dispatch({ type: 'USER_LOGIN', username: data.username, id_user: data.id_user });
    });
  }

  render() {
    return (
      <div>
        <div className="window login">
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
                <div className="form-field">
                  <label htmlFor="password">Password :</label>
                  <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password-confirmation">Confirmation :</label>
                  <input id="password-confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                </div>
                <button className="btn uppercase" type="submit">Submit</button>
              </div>
              <p className="account-help">You do not have an account ? <a onClick={this.handleClick} className="underline red" >Register</a></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordForgotten;
