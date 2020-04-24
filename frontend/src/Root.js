import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import NavBar from "./components/NavBar/NavBar";
import configureStore from "./configureStore";

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
