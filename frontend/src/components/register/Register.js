import React, { Component } from 'react';
import '../../css/main.css'

import { register } from '../../socket/userSocket';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.dispatch({ type: 'USER_CONNEXION_DEMAND' })
  }
  handleChange(event) {
    switch (event.target.id) {
      case "username":
        this.setState({ username: event.target.value });
        break;
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
    register(this.state.username, this.state.email, this.state.password, (err, data) => {
      //console.log(data);
      this.props.dispatch({ type: 'USER_LOGIN', username: data.username });
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          <div class="row">
            <div class="col" id="leftLog">

              <div id="birdPic">
                <img src={require("../../images/swellodesk_image.png")} class="rounded mx-auto d-block" alt="swello" id="axBP"></img></div>

            </div>
            <div class="col" id="rightLog">
              <form onSubmit={this.handleSubmit}>
                <legend class="text-center">SwelloDesk</legend>

                <fieldset>
                  <legend class="text-center">Please complete to create your account</legend>

                  <div class="form-group col-md-12">
                    <label htmlFor="email">Email :</label>
                    <input type="email" class="form-control" id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                  </div>

                  <div class="form-group col-md-12">
                    <label htmlFor="username">Username :</label>
                    <input type="text" class="form-control" id="username" type="text" value={this.state.username} onChange={this.handleChange} />
                  </div>


                  <div class="form-group col-md-12">
                    <label htmlFor="password">Password :</label>
                    <input id="password" type="password" class="form-control" value={this.state.password} onChange={this.handleChange} />
                  </div>

                  <div class="form-group col-md-12">
                    <label for="confirm_password">Confirm Password</label>
                    <input id="password-confirmation" type="password" class="form-control" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                  </div>

                </fieldset>

                <div class="form-group">
                  <div class="col-md-12">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" value="" id="cbox" />
                        I accept the <a href="#">terms and conditions</a>.
                    </label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12">
                    <button type="submit" class="btn btn-primary">
                      Sign Up
                  </button>

                    <a href="#" onClick={this.handleClick}>Already have an account? Sign In</a>

                </div>
                </div>

              </form>
            </div>
          </div>
        </div>,
      {/*  <div className="window login">
          <div className="window-header">
            <h1 className="uppercase"> Register </h1>
          </div>
          <div className="window-contain">
            <div className="form-group">
              <form onSubmit={this.handleSubmit}>
                <div className="form-field">
                  <label htmlFor="email">Email :</label>
                  <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="username">Username :</label>
                  <input id="username" type="text" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password :</label>
                  <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password-confirmation">Confirmation :</label>
                  <input id="password-confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn uppercase">Register</button>
              </form>
            </div>
            <p className="account-help">You already have an account ? <a onClick={this.handleClick} className="underline red" >Login</a></p>
          </div>
        </div>
      </div>*/},
      </div>

    );
  }
}

export default Register;
