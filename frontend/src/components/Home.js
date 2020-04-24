import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { Button } from "antd";
import "antd/dist/antd.css";

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;

    return (
      <div>
        <h1>This is Lost in London's protected area.</h1>
        <p>Any routes here will also be protected</p>
        <Button
          type="primary"
          onClick={this.handleLogout}
          style={{ marginLeft: 8 }}
        >
          Logout
        </Button>
        {isLoggingOut && <p> Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default connect(mapStateToProps)(Home);
