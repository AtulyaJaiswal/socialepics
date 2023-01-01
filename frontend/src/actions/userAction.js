import axios from "axios";
import{
    USER_POSTS_REQUEST,
    USER_POSTS_SUCCESS,
    USER_POSTS_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";

// Login
export const login = (email) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/social/login`,
        { email },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/social/register`, userData, config);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/social/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

//GET ALL USER POSTS
export const getMyPosts = () => async (dispatch) => {

    try {
        
        dispatch({ type: USER_POSTS_REQUEST});

        const { data } = await axios.get("/social/myPosts");

        // console.log(data.userPosts);

        dispatch({
            type: USER_POSTS_SUCCESS,
            payload: data.userPosts,
          });

    } catch (error) {
        dispatch({
            type: USER_POSTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`/social/me`);
  
      // console.log(data);

      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

//GET ALL USER --ADMIN
export const getAllUsers = () => async (dispatch) => {
  try {
      
      dispatch({ type: ALL_USER_REQUEST});

      const { data } = await axios.get("/social/getAllUsers");

      console.log(data.users);

      dispatch({
          type: ALL_USER_SUCCESS,
          payload: data.users,
        });

  } catch (error) {
      console.log(error);
      dispatch({
          type: ALL_USER_FAIL,
          payload: error.response.data.message,
      });
  }
};

//DELETE USER --ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/social/deleteUser/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};