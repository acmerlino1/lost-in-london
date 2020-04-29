import { externalApi } from "./auth";

export const VIEW_ALL_POSTS = "VIEW_ALL_POSTS";

const viewAllPosts = (data) => {
  return {
    type: VIEW_ALL_POSTS,
    data: data,
  };
};

export const getAllPosts = () => (dispatch) => {
  externalApi
    .url("/posts")
    .get()
    .json((response) => {
      dispatch(viewAllPosts(response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const storeNewPost = (postTitle, postBody, postCategory) => (
  dispatch
) => {
  externalApi
    .url("/posts")
    .post({
      title: postTitle,
      description: postBody,
      category: postCategory,
    })
    .json((response) => {
      debugger;
      dispatch(viewAllPosts(response));
    })
    .catch((err) => {
      console.log(err);
    });
};
