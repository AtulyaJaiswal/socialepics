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
    CREATE_SCHEDULE_POST_REQUEST,
    CREATE_SCHEDULE_POST_SUCCESS,
    CREATE_SCHEDULE_POST_FAIL,
    CREATE_SCHEDULE_POST_RESET,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_RESET,
    DELETE_POST_FAIL,
    DELETE_SCHEDULED_POST_REQUEST,
    DELETE_SCHEDULED_POST_SUCCESS,
    DELETE_SCHEDULED_POST_FAIL,
    DELETE_SCHEDULED_POST_RESET,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_RESET,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    COMMENT_RESET,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    TREND_GET_REQUEST,
    TREND_GET_SUCCESS,
    TREND_GET_FAIL,
    TREND_POST_REQUEST,
    TREND_POST_SUCCESS,
    TREND_POST_FAIL,
    SAVE_SCHEDULE_POST_REQUEST,
    SAVE_SCHEDULE_POST_SUCCESS,
    SAVE_SCHEDULE_POST_FAIL,
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

export const createSchedulePostReducer = (state = {schedulePost: {}}, action) => {
  switch (action.type) {
      case CREATE_SCHEDULE_POST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_SCHEDULE_POST_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          schedulePost: action.payload.schedulePost,
        };
      case CREATE_SCHEDULE_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_SCHEDULE_POST_RESET:
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

export const saveScheduledPostReducer = (state = {}, action) => {

    switch(action.type){
        case SAVE_SCHEDULE_POST_REQUEST:
            return {
                loading: true,
            };
        case SAVE_SCHEDULE_POST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
            };
        case SAVE_SCHEDULE_POST_FAIL:
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
export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case COMMENT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COMMENT_DELETE_RESET:
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

export const deleteScheduledPostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SCHEDULED_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SCHEDULED_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_SCHEDULED_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SCHEDULED_POST_RESET:
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

export const trendReducer = (state = {trends: []}, action) => {

  switch(action.type){
    case TREND_GET_REQUEST:
        return {
            loading: true,
            trends: [],
        };
    case TREND_GET_SUCCESS:
        return {
            loading: false,
            trends: action.payload,
        };
    case TREND_GET_FAIL:
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

//Get Trend Posts
export const trendPostReducer = (state = {trendPosts: []}, action) => {

    switch(action.type){
        case TREND_POST_REQUEST:
            return {
                loading: true,
                trendPosts: [],
            };
        case TREND_POST_SUCCESS:
            return {
                loading: false,
                trendPosts: action.payload,
            };
        case TREND_POST_FAIL:
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

