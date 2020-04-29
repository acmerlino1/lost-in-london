import { VIEW_ALL_POSTS } from "../actions/post";

export default (
  state = {
    posts: {},
  },
  action
) => {
  switch (action.type) {
    case VIEW_ALL_POSTS:
      return {
        ...state,
        posts: action.data,
      };
    default:
      return state;
  }
};
