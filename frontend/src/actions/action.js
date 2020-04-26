export const ADD_POST = "ADD_POST";
export const TOGGLE_POST = "TOGGLE_POST";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETE: "SHOW_COMPLETE",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

export function addPost(text) {
  return {
    type: ADD_POST,
    text,
  };
}

export function togglePost(index) {
  return { type: TOGGLE_POST, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
