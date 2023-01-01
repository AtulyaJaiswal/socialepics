import React, { Fragment, useEffect } from 'react';
import CreatePost from './CreatePost';
// import PostCard from './PostCard';
import "./Profile.css";
import ProfilePostCard from './ProfilePostCard';
import { getMyPosts, clearErrors } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import { CREATE_POST_RESET, DELETE_POST_RESET } from '../../constants/postConstants';
import AddIcon from '@mui/icons-material/Add';

const Profile = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userPosts } = useSelector((state) => state.userPosts);
  const { error:deletedError, isDeleted } = useSelector((state) => state.deletePost);
  const { loading:userLoading, isAuthenticated, user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.createPost);

  const open = () => {
    if(isAuthenticated===false){
      toast.error("Login first");
    }

    if(isAuthenticated){
      navigate("/createPostMobile");
    }
  }


  useEffect(() => {
    if(error){
        toast.error(error);
        dispatch(clearErrors());
    }
    if(deletedError){
      toast.error(deletedError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      toast.success("Post Deleted");
      dispatch({ type: DELETE_POST_RESET });
    }
    if (success) {
      toast.success("Posted");
      dispatch({ type: CREATE_POST_RESET });
    }
    if(isAuthenticated){
      dispatch(getMyPosts());
    }
    else{
      navigate("/login");
    }
}, [dispatch, error, success, isDeleted, deletedError, isAuthenticated, navigate]);

const signOut = () => {
  dispatch(logout());
  navigate("/");
}

  return (
    <Fragment>
        {loading || userLoading ? (
          <Loader/>
        ) : (
          <Fragment>
            
              <div className='profile'>
                  <div className='profile-left'>
                      <div className='profile-heading'>
                        <div className='profile-heading-left'>
                          <h4>{user.userName}</h4>
                          <h6>{user.email}</h6>
                        </div>
                        <div className='profile-heading-right'>
                          <button onClick={signOut}>LogOut</button>
                        </div>
                      </div>
                      
                      <div>
                        {
                          (Array.isArray(userPosts) && userPosts.length) ? (
                            userPosts &&
                              userPosts.map((userPost) => {
                                return(
                                  <ProfilePostCard key={userPost._id} userPost={userPost} user={user}/>
                                );
                            })
                          ) : (
                            <div className='no_posts'>
                              <h3>No Posts yet.</h3>
                            </div>
                          )
                        }
                    
                  </div>
                  </div>
                  <div className='profile-right'>
                      <CreatePost/>
                  </div>
              </div>
              {/* FLOATING BUTTON */}
              <div className='floating_button'>
                  <button onClick={open}>
                      <AddIcon/>
                  </button>
              </div>
          </Fragment>
      )}
    </Fragment>
  )
}

export default Profile