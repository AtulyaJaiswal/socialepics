import { 
     CREATE_UPDATE_POST_REQUEST,
     CREATE_UPDATE_POST_SUCCESS,
     CREATE_UPDATE_POST_FAIL,
     CREATE_UPDATE_POST_RESET,
     ALL_UPDATE_POST_REQUEST,
     ALL_UPDATE_POST_SUCCESS,
     ALL_UPDATE_POST_FAIL,
     CLEAR_ERRORS,
}
from "../constants/adminConstants";


export const createUpdatePostReducer = (state = {updatePost: {}}, action) => {
     switch (action.type) {
         case CREATE_UPDATE_POST_REQUEST:
           return {
             ...state,
             loading: true,
           };
         case CREATE_UPDATE_POST_SUCCESS:
           return {
             loading: false,
             success: action.payload.success,
             post: action.payload.post,
           };
         case CREATE_UPDATE_POST_FAIL:
           return {
             ...state,
             loading: false,
             error: action.payload,
           };
         case CREATE_UPDATE_POST_RESET:
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

export const updatePostReducer = (state = {updatePosts: []}, action) => {

    switch(action.type){
        case ALL_UPDATE_POST_REQUEST:
            return {
                loading: true,
                updatePosts: [],
            };
        case ALL_UPDATE_POST_SUCCESS:
            return {
                loading: false,
                updatePosts: action.payload,
            };
        case ALL_UPDATE_POST_FAIL:
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