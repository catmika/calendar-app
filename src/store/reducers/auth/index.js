import axios from "axios";
import UserService from "../../../api/UserService";

const initialState = {
  isAuth: false,
  user: {},
  isLoading: false,
  error: "",
};

const SET_AUTH = "SET_AUTH";
const SET_USER = "SET_USER";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_ERROR = "SET_ERROR";

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

// Action creators
export const setAuthAction = (payload) => ({
  type: SET_AUTH,
  payload,
});
export const setUserAction = (payload) => ({
  type: SET_USER,
  payload,
});
export const setIsLoadingAction = (payload) => ({
  type: SET_IS_LOADING,
  payload,
});
export const setErrorAction = (payload) => ({
  type: SET_ERROR,
  payload,
});
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(setIsLoadingAction(true));
    setTimeout(async () => {
      const response = await UserService.getUsers();
      const mockUser = response.data.find(
        (user) => user.username === username && user.password === password
      );
      if (mockUser) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("username", mockUser.username);
        dispatch(setUserAction(mockUser.username));
        dispatch(setAuthAction(true));
      } else {
        dispatch(setErrorAction("Username or password is invalid"));
      }
      dispatch(setIsLoadingAction(false));
    }, 1000);
  } catch (e) {
    dispatch(setErrorAction(e));
  }
};
export const logout = () => async (dispatch) => {
  localStorage.removeItem("auth");
  localStorage.removeItem("username");
  dispatch(setUserAction({}));
  dispatch(setAuthAction(false));
};
