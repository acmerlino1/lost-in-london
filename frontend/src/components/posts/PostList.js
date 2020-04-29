import React, { Component } from "react";
import SinglePost from "./SinglePost";
import { connect } from "react-redux";

class PostList extends Component {
  render() {
    const posts = Array.from(this.props.posts);
    return (
      <div>
        {posts.reverse().map((post, key) => (
          <SinglePost post={post} key={post.userId} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
  };
}
export default connect(mapStateToProps)(PostList);
