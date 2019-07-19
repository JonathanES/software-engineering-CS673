import React, { Component } from 'react';
import '../../css/main.css'
import { login } from '../../socket/userSocket';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
import moment from 'moment';

const cookies = new Cookies();


class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

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
    this.handlePasswordForgotten = this.handlePasswordForgotten.bind(this);
  }

  componentDidMount() {

    if (cookies) {
      if (cookies.get('username') && cookies.get('userId'))
        this.props.dispatch({ type: 'USER_LOGIN', username: cookies.get('username'), userId: cookies.get('userId') });
    }
  }

  handleClick(event) {
    this.props.dispatch({ type: 'USER_REGISTER_DEMAND' });
  }

  handlePasswordForgotten() {
    this.props.dispatch({ type: 'USER_PASSWORD_DEMAND' });
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
    login(this.state.email, this.state.password, async (err, data) => {
      console.log(data);
      cookies.set('username', data.username, { path: '/'/*, expires: new Date(Date.now()+30)*/});
      cookies.set('userId', data.userId, { path: '/' /*, expires: new Date(Date.now()+30)*/});
      this.props.dispatch({ type: 'USER_LOGIN', username: data.username, userId: data.userId });
    });
  }

  render() {
    return (
      /*<div>
        <div class="row no-gutters">
          <div class="col no-gutters">
            <div class="leftside">

              <div class="test">
                <img src={require('../../images/swellodesk_image.png')} class="rounded mx-auto d-block" alt="swello"></img>

              </div>
              <p class="text-center">Build your dream project.
                Collaborate with your team.
              Work at your own pace.</p>
            </div>
          </div>

          <div class="col no-gutters">
            <div class="rightside">
              <form class="form-inline" onSubmit={this.handleSubmit}>
                <label class="sr-only" for="inlineFormInputUsername2">Username</label>
                <input id="email" class="form-control mb-2 mr-sm-2" placeholder="Email" type="text" value={this.state.email} onChange={this.handleChange} />

                <label class="sr-only" for="inlineFormInputGroupPassword2">Password</label>
                <div class="input-group mb-2 mr-sm-2">
                  <input id="password" type="password" class="form-control" placeholder="..............................." value={this.state.password} onChange={this.handleChange} />
                </div>

                <div class="form-check mb-2 mr-sm-2">
                  <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
                  <label class="form-check-label" for="inlineFormCheck">
                    Remember me
                </label>
                </div>
                <button type="submit" class="btn btn-primary mb-2">Sign in</button>
              </form>
              <h1 class="text-center">Join SwelloDesk Today!</h1>
              <div class="col-md-12 text-center">
                <div class="mx-auto">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <p className="account-help">You do not have an account ? <a onClick={this.handleClick} className="underline red" >Register</a></p>
                  </div>
                  <p className="account-help">Forgot your password ? <a onClick={this.handlePasswordForgotten} className="underline red" >Password forgotten</a></p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/
      <div>
        <aside></aside>
        <div className="window login">
          <div className="window-header">
            <h1 > Sign in </h1>
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
                <button className="btn uppercase" type="submit">Sign in</button>
              </div>
              <p className="account-help">You do not have an account ? <a onClick={this.handleClick} className="underline red" >Register</a></p>
              <p className="account-help">Forgot your password ? <a onClick={this.handlePasswordForgotten} className="underline red" >Password forgotten</a></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
