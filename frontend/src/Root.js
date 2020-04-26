import React from "react";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
