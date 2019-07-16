import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import BasePage from "./layouts/BasePage";

const App = () => (
  <Provider store={store}>
    <BasePage />
  </Provider>
);

export default App;
