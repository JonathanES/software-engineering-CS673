import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './layouts/MainPage'
import { CookiesProvider } from 'react-cookie';


const App = () => (
  <CookiesProvider>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </CookiesProvider>
);

export default App;
