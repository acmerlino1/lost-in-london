import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { Button } from "antd";
import "antd/dist/antd.css";

class Login extends Component {
  handleSubmit = () => {
    const { dispatch } = this.props;

    dispatch(loginUser());
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Lost in London</h1>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              style={{ marginLeft: 8 }}
            >
              Login with Google
            </Button>
          </header>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
