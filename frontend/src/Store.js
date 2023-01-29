import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {postReducer,
        openSpecificPostReducer,
        createPostReducer,
        commentReducer,
        deletePostReducer,
        likePostReducer,
        trendReducer,
        trendPostReducer,
        deleteCommentReducer,
        createSchedulePostReducer,
        deleteScheduledPostReducer,
        saveScheduledPostReducer,
} from "./reducers/postReducer";
import { allUserReducer,
     deleteUserReducer, 
     userPostsReducer, 
     userReducer, 
     userScheduledPostsReducer} from "./reducers/userReducer";
import { createUpdatePostReducer, updatePostReducer } from "./reducers/adminReducer";

const reducer = combineReducers({
    posts: postReducer,
    openSpecificPost: openSpecificPostReducer,
    userPosts: userPostsReducer,
    scheduledPosts: userScheduledPostsReducer,
    saveScheduledPosts: saveScheduledPostReducer,
    user: userReducer,
    allUser: allUserReducer,
    deleteUser: deleteUserReducer,
    // loadUser: loadUserReducer,
    createPost: createPostReducer,
    schedulePost: createSchedulePostReducer,
    comment: commentReducer,
    commentDelete: deleteCommentReducer,
    deletePost: deletePostReducer,
    deleteScheduledPost: deleteScheduledPostReducer,
    likePost: likePostReducer,
    trends: trendReducer,
    trendPosts: trendPostReducer,
    createUpdatePosts: createUpdatePostReducer,
    updatePosts: updatePostReducer,
});

let initialState = {
    
};

const middleware = [
    thunk
];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;