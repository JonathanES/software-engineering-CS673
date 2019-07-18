import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import UpdatePassword from './components/passwordForgotten/UpdatePassword';
import BasePage from './layouts/BasePage';
import { withCookies } from 'react-cookie';



const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" render={() => (<BasePage cookies={this.props.cookies}/>)}/>
        <Route path="/password" component={UpdatePassword} />
      </div>
    </Router>
  </Provider>
);

export default withCookies(App);
