import{
    ALL_POST_REQUEST,
    ALL_POST_SUCCESS,
    ALL_POST_FAIL,
    OPEN_SPECIFIC_POST_REQUEST,
    OPEN_SPECIFIC_POST_SUCCESS,
    OPEN_SPECIFIC_POST_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_RESET,
    CREATE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_RESET,
    DELETE_POST_FAIL,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    COMMENT_RESET,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    CLEAR_ERRORS,
}
from "../constants/postConstants";

export const createPostReducer = (state = {post: {}}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case CREATE_POST_SUCCESS:
          return {
            loading: false,
            success: action.payload.success,
            post: action.payload.post,
          };
        case CREATE_POST_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        case CREATE_POST_RESET:
          return {
            ...state,
            success: false,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}

export const postReducer = (state = {posts: []}, action) => {

  // const updatedPosts = state.posts.map((post) => {
  //   if (post._id === action.payload.post._id) return action.payload.post;
  //   return post;
  // });
  // state.posts = updatedPosts;

    switch(action.type){
        case ALL_POST_REQUEST:
            return {
                loading: true,
                posts: [],
            };
        case ALL_POST_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
            };
        case ALL_POST_FAIL:
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

export const openSpecificPostReducer = (state = {post: {}}, action) => {
    switch(action.type){
        case OPEN_SPECIFIC_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case OPEN_SPECIFIC_POST_SUCCESS:
            return {
                loading: false,
                post: action.payload,
            };
        case OPEN_SPECIFIC_POST_FAIL:
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

export const commentReducer = (state = {comment: {}}, action) => {
    switch (action.type) {
        case COMMENT_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case COMMENT_SUCCESS:
        return {
            loading: false,
            success: action.payload.success,
            comment: action.payload.comment,
        };
        case COMMENT_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        case COMMENT_RESET:
        return {
            ...state,
            success: false,
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

export const deletePostReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_POST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_POST_RESET:
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

export const likePostReducer = (state = {like: {}}, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case LIKE_POST_FAIL:
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

