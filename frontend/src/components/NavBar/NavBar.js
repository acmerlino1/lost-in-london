import React, { Component } from "react";
import "./NavBar.css";
import { Layout, Menu } from "antd";
import { logoutUser } from "../../actions";
import { connect } from "react-redux";

class Navbar extends Component {
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const button = this.props.isAuthenticated ? (
      <Menu.Item
        key="app"
        onClick={this.handleLogout}
        style={{ float: "right" }}
      >
        <span>Logout</span>
      </Menu.Item>
    ) : (
      <Menu.Item key="mail" style={{ float: "right" }}>
        <span>Signin</span>
      </Menu.Item>
    );
    return (
      <Layout.Header>
        <div className="logo" />
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="posts">
            <span>Posts</span>
          </Menu.Item>
          <Menu.Item key="alipay">
            <span>Contact Us</span>
          </Menu.Item>
          {button}
        </Menu>
      </Layout.Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
