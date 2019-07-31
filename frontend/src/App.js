import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import UpdatePassword from './components/passwordForgotten/UpdatePassword';
import BasePage from './layouts/BasePage';
import { withCookies } from 'react-cookie';
import "./css/app.css";



const App = () => (
  <Provider store={store}>
    <Router>
      <div className="appMainContainer">
        <Route exact path="/" component={BasePage} />
        <Route path="/password" component={UpdatePassword} />
      </div>
    </Router>
  </Provider>
);

export default App;
