<<<<<<< HEAD
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import MainPage from "./components/layouts/MainPage";
=======
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import BasePage from './layouts/BasePage'
>>>>>>> d7da708c8333c36382718206e93fbd6abc1380b8

const App = () => (
  <Provider store={store}>
    <BasePage />
  </Provider>
);

export default App;
