import axios from "axios";
import { 
    ALL_POST_REQUEST,
    ALL_POST_SUCCESS,
    ALL_POST_FAIL,
    OPEN_SPECIFIC_POST_REQUEST,
    OPEN_SPECIFIC_POST_SUCCESS,
    OPEN_SPECIFIC_POST_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    CREATE_SCHEDULE_POST_REQUEST,
    CREATE_SCHEDULE_POST_SUCCESS,
    CREATE_SCHEDULE_POST_FAIL,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_SCHEDULED_POST_REQUEST,
    DELETE_SCHEDULED_POST_SUCCESS,
    DELETE_SCHEDULED_POST_FAIL,
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

//CREATE POSTS
export const createsPost = (postData) => async (dispatch) => {

    try{
        dispatch({ type: CREATE_POST_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/social/createPost`, postData, config);
  
      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error){
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response.data.message,
        });
    }
}

//Schedule POSTS
export const createSchedulePost = (postData) => async (dispatch) => {

  try{
      dispatch({ type: CREATE_SCHEDULE_POST_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/social/createSchedulePost`, postData, config);

    dispatch({ type: CREATE_SCHEDULE_POST_SUCCESS, payload: data });
  } catch (error){
      dispatch({
          type: CREATE_SCHEDULE_POST_FAIL,
          payload: error.response.data.message,
      });
  }
};

//Save Scheduled POSTS
export const saveScheduledPosts = () => async (dispatch) => {
  try {
      
      dispatch({ type: SAVE_SCHEDULE_POST_REQUEST});

      const { data } = await axios.get("/social/schedulePosts");

      dispatch({
          type: SAVE_SCHEDULE_POST_SUCCESS,
          payload: data,
        });

  } catch (error) {
      console.log(error);
      dispatch({
          type: SAVE_SCHEDULE_POST_FAIL,
          payload: error.response.data.message,
      });
  }
};

//GET ALL POSTS
export const getPosts = () => async (dispatch) => {
    try {
        
        dispatch({ type: ALL_POST_REQUEST});

        const { data } = await axios.get("/social/posts");

        // console.log(data.posts);

        dispatch({
            type: ALL_POST_SUCCESS,
            payload: data.posts,
          });

    } catch (error) {
        console.log(error);
        dispatch({
            type: ALL_POST_FAIL,
            payload: error.response.data.message,
        });
    }
};

//GET Trend POSTS
export const getTrendPosts = (trend) => async (dispatch) => {
  try {
      
      dispatch({ type: TREND_POST_REQUEST});
      // console.log(trend);

      // const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.get(`/social/trendPosts?trend=${trend.name}`);

      // console.log(data.trendPosts);

      dispatch({
          type: TREND_POST_SUCCESS,
          payload: data.trendPosts,
        });

  } catch (error) {
      console.log(error);
      dispatch({
          type: TREND_POST_FAIL,
          payload: error.response.data.message,
      });
  }
};

//GET SPECIFIC POSTS
export const openSpecificPost = (id) => async (dispatch) => {
    try {
        
        dispatch({ type: OPEN_SPECIFIC_POST_REQUEST});

        const { data } = await axios.get(`/social/comment/${id}`);

        // console.log(data.post);

        dispatch({
            type: OPEN_SPECIFIC_POST_SUCCESS,
            payload: data.post,
          });

    } catch (error) {
        console.log(error);
        dispatch({
            type: OPEN_SPECIFIC_POST_FAIL,
            payload: error.response.data.message,
        });
    }
};

//ADD COMMENT
export const addComment = (comment,id) => async (dispatch) => {

    try{
        dispatch({ type: COMMENT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(`/social/addComment`, {comment, id}, config );
  
      dispatch({ type: COMMENT_SUCCESS, payload: data });

    } catch (error){
        dispatch({
            type: COMMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Delete Comment
export const deleteComment= (id, commentId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    // const { data } = await axios.delete(`/social/comment/${id}`, {commentId} , config);

    const { data } = await axios.delete(`/social/comment/${id}`,{
      data : {commentId}
    });

    // console.log(data);

    dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data.message });

  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_POST_REQUEST });
  
      const { data } = await axios.delete(`/social/deletePost/${id}`);
  
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_POST_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Delete Scheduled Post
export const deleteScheduledPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SCHEDULED_POST_REQUEST });

    const { data } = await axios.delete(`/social/deleteScheduledPost/${id}`);

    dispatch({
      type: DELETE_SCHEDULED_POST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SCHEDULED_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Likes Dislikes
export const likeDislike = (id) => async (dispatch) => {
    try {
        dispatch({ type: LIKE_POST_REQUEST });
    
        const { data } = await axios.get(`/social/like/${id}`);
    
        dispatch({
          type: LIKE_POST_SUCCESS,
          payload: data.message,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: LIKE_POST_FAIL,
          payload: error.response.data.message,
        });
      }
}

//Trend Getter
export const getTrends = () => async (dispatch) => {
  try {
      dispatch({ type: TREND_GET_REQUEST });
  
      const { data } = await axios.get(`/social/trends`);
      
      // console.log(data);
  
      dispatch({
        type: TREND_GET_SUCCESS,
        payload: data.trends,
      });

    } catch (error) {
      // console.log(error);
      dispatch({
        type: TREND_GET_FAIL,
        payload: error.response.data.message,
      });
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};