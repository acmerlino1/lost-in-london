import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { Button, Layout } from "antd";
import NavBar from "./NavBar/NavBar";
import CreatePost from "./posts/CreatePost";

class Home extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar />
        <Layout.Content style={{ padding: "0 50px" }}>
          <h1>Welcome to Lost in London's</h1>
          <CreatePost />
        </Layout.Content>
      </Layout>
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
