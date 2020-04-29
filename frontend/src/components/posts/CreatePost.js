import React, { Component } from "react";
import { Card, Form, Input, Button, Select } from "antd";
import { connect } from "react-redux";
import { storeNewPost } from "../../actions/post";
import { getAllPosts } from "../../actions/post";

class CreatePost extends Component {
  formRef = React.createRef();
  savePost = (values) => {
    this.props.storeNewPost(values.title, values.description, values.category);
    this.props.getAllPosts();
    this.formRef.current.resetFields();
  };

  render() {
    const { Option } = Select;
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

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select defaultValue="Arts" style={{ width: 120 }}>
              <Option value="Arts">Arts</Option>
              <Option value="Crafts">Crafts</Option>
              <Option value="Collecting">Collecting</Option>
              <Option value="Dance">Dance</Option>
              <Option value="Drinks">Drinks</Option>
              <Option value="Food">Food</Option>
              <Option value="Games">Games</Option>
              <Option value="Markets">Markets</Option>
              <Option value="Museums">Museums</Option>
              <Option value="Music">Music</Option>
              <Option value="Other">Other</Option>
              <Option value="Reading">Reading</Option>
              <Option value="Sciences">Sciences</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Theatre">Theatre</Option>
            </Select>
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
