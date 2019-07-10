import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './layouts/MainPage'
import "./css/main_reg.css";
import "./css/main_login.css";

const App = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
);

export default App;
