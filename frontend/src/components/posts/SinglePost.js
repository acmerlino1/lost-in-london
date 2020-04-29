import React, { Component } from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  render() {
    const { Meta } = Card;
    return (
      <Card
        style={{ width: "50%" }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
        ]}
      >
        <Meta
          title={this.props.post.title}
          description={this.props.post.description}
        />
        <p>{this.props.post.category}</p>
        <p>{this.props.post.userName}</p>
      </Card>
    );
  }
}
export default SinglePost;
