import { myFirebase } from "../firebase/firebase";
import firebase from "firebase/app";
import wretch from "wretch";
import "firebase/auth";
import "firebase/firestore";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (result) => {
  return {
    type: LOGIN_SUCCESS,
    result,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const recieveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");

export const loginUser = () => (dispatch) => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      dispatch(createUser(result));
    })
    .catch((error) => {
      dispatch(loginError());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(recieveLogout());
    })
    .catch((error) => {
      dispatch(logoutError());
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};

const getCurrentUser = () => {
  return myFirebase.auth().currentUser.getIdToken(false);
};

const firebaseAuthMiddleware = () => (next) => (url, opts) => {
  return getCurrentUser().then(function (idToken) {
    opts.headers["Authorization"] = "Bearer " + idToken;
    return next(url, opts);
  });
};

export const externalApi = wretch()
  .url("http://localhost:4567")
  .middlewares([firebaseAuthMiddleware()])
  .options({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const createUser = (result) => (dispatch) => {
  externalApi
    .url("/users")
    .post()
    .res((response) => {
      console.log(response);
      dispatch(receiveLogin(result));
    })
    .catch((err) => {});
  // dispatch(receiveLogin(result));
  // var token = result.credential.accessToken;
  // var user = result.user;
};
