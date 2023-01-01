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
    DELETE_USER_RESET,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";

//USER REGISTRATION && LOAD USER
export const userReducer = (state = {user: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return{
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state; 
    }
};

//SPECIFIC POST
export const userPostsReducer = (state = {userPosts: []}, action) => {
    switch(action.type){
        case USER_POSTS_REQUEST:
            return {
                loading: true,
                userPosts: [],
            };
        case USER_POSTS_SUCCESS:
            return {
                loading: false,
                userPosts: action.payload,
            };
        case USER_POSTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;   
    }
};

//DELETE USER --ADMIN
export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
      case DELETE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_USER_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
};

export const allUserReducer = (state = {users: []}, action) => {
  
      switch(action.type){
          case ALL_USER_REQUEST:
              return {
                  loading: true,
                  users: [],
              };
          case ALL_USER_SUCCESS:
              return {
                  loading: false,
                  users: action.payload,
              };
          case ALL_USER_FAIL:
              return {
                  loading: false,
                  error: action.payload,
              };
          case CLEAR_ERRORS:
              return {
                  ...state,
                  error: null,
              };
          default:
              return state;   
      }
  };