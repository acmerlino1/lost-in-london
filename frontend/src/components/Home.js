import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import NavBar from "./NavBar/NavBar";
import CreatePost from "./posts/CreatePost";
import { getAllPosts } from "../actions/post";
import PostList from "./posts/PostList";

class Home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar />
        <Layout.Content style={{ padding: "0 50px" }}>
          <h1>Welcome to Lost in London's</h1>
          <CreatePost />
          <PostList />
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

export default connect(mapStateToProps, { getAllPosts })(Home);
