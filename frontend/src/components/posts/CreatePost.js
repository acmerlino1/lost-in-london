import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Button, Checkbox } from "antd";

class CreatePost extends Component {
  render() {
    return (
      <Card title="Create a post" style={{ width: "100%" }}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
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
export default CreatePost;
