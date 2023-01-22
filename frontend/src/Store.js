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
} from "./reducers/postReducer";
import { allUserReducer,
     deleteUserReducer, 
     userPostsReducer, 
     userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    posts: postReducer,
    openSpecificPost: openSpecificPostReducer,
    userPosts: userPostsReducer,
    user: userReducer,
    allUser: allUserReducer,
    deleteUser: deleteUserReducer,
    // loadUser: loadUserReducer,
    createPost: createPostReducer,
    comment: commentReducer,
    deletePost: deletePostReducer,
    likePost: likePostReducer,
    trends: trendReducer,
    trendPosts: trendPostReducer,
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