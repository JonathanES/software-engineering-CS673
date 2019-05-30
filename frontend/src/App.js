import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './layouts/MainPage'

const App = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
);

export default App;
