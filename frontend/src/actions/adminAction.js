import axios from "axios";
import { 
     CREATE_UPDATE_POST_REQUEST,
     CREATE_UPDATE_POST_SUCCESS,
     CREATE_UPDATE_POST_FAIL,
     ALL_UPDATE_POST_REQUEST,
     ALL_UPDATE_POST_SUCCESS,
     ALL_UPDATE_POST_FAIL,
     CLEAR_ERRORS,
}
from "../constants/adminConstants";

//CREATE UPDATE POSTS
export const createsUpdatePost = (postData) => async (dispatch) => {

     try{
         dispatch({ type: CREATE_UPDATE_POST_REQUEST });
   
       const config = { headers: { "Content-Type": "multipart/form-data" } };
 
       const { data } = await axios.post(`/social/createUpdatePost`, postData, config);
   
       dispatch({ type: CREATE_UPDATE_POST_SUCCESS, payload: data });
     } catch (error){
         dispatch({
             type: CREATE_UPDATE_POST_FAIL,
             payload: error.response.data.message,
         });
     }
};

//GET ALL POSTS
export const getUpdatePosts = () => async (dispatch) => {
     try {
         
         dispatch({ type: ALL_UPDATE_POST_REQUEST});
 
         const { data } = await axios.get("/social/updatePosts");
 
        //  console.log(data.updatePosts);
 
         dispatch({
             type: ALL_UPDATE_POST_SUCCESS,
             payload: data.updatePosts,
           });
 
     } catch (error) {
         console.log(error);
         dispatch({
             type: ALL_UPDATE_POST_FAIL,
             payload: error.response.data.message,
         });
     }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
     dispatch({ type: CLEAR_ERRORS });
};