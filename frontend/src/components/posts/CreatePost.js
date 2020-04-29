import React, { Component } from "react";
import { Card, Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { storeNewPost } from "../../actions/post";
import { getAllPosts } from "../../actions/post";

class CreatePost extends Component {
  formRef = React.createRef();
  savePost = (values) => {
    this.props.storeNewPost(values.title, values.description, "Art");
    this.props.getAllPosts();
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <Card title="Create a post" style={{ width: "100%" }}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          ref={this.formRef}
          onFinish={this.savePost}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter a title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter a description!",
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default connect(null, { storeNewPost, getAllPosts })(CreatePost);
