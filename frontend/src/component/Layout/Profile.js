import React, { Fragment, useEffect } from 'react';
import CreatePost from './CreatePost';
// import PostCard from './PostCard';
import "./Profile.css";
import ProfilePostCard from './ProfilePostCard';
import { getMyPosts, clearErrors, getMyScheduledPosts } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import { CREATE_POST_RESET, CREATE_SCHEDULE_POST_RESET, DELETE_POST_RESET, DELETE_SCHEDULED_POST_RESET } from '../../constants/postConstants';
import AddIcon from '@mui/icons-material/Add';
import ProfileSchedulePostCard from './ProfileSchedulePostCard';

const Profile = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userPosts } = useSelector((state) => state.userPosts);
  const { loading: scheduledPostsLoading, error: scheduledPostsError, userScheduledPosts } = useSelector((state) => state.scheduledPosts);
  const { error:deletedError, isDeleted } = useSelector((state) => state.deletePost);
  const { error:deletedScheduledError, isDeleted: isScheduledDeleted } = useSelector((state) => state.deleteScheduledPost);
  const { loading:userLoading, isAuthenticated, user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.createPost);
  const { success: scheduleSuccess } = useSelector((state) => state.schedulePost);
  const { time } = useSelector((state) => state.saveScheduledPosts);
  
  console.log(time);
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
    if(scheduledPostsError){
      toast.error(scheduledPostsError);
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
    if(deletedScheduledError){
      toast.error(deletedScheduledError);
      dispatch(clearErrors());
    }
    if(isScheduledDeleted){
      toast.success("Scheduled Post Deleted");
      dispatch({ type: DELETE_SCHEDULED_POST_RESET });
    }
    if (window.innerWidth>600 && success) {
      toast.success("Posted");
      dispatch({ type: CREATE_POST_RESET });
    }
    if(window.innerWidth>600 && scheduleSuccess){
      toast.success("Scheduled");
      dispatch({ type: CREATE_SCHEDULE_POST_RESET });
    }
    if(isAuthenticated){
      dispatch(getMyPosts());
      dispatch(getMyScheduledPosts());
    }
    else{
      navigate("/login");
    }
}, [dispatch, 
    error, 
    success, 
    isDeleted, 
    deletedError, 
    isAuthenticated, 
    navigate, 
    deletedScheduledError, 
    isScheduledDeleted, 
    scheduleSuccess]);

const signOut = () => {
  dispatch(logout());
  navigate("/");
}

  return (
    <Fragment>
        {loading || userLoading || scheduledPostsLoading ? (
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
                      <h1>{time}</h1>
                      <div>
                        {
                          userScheduledPosts &&
                            userScheduledPosts.map((userSchedulePost) => {
                              return(
                                <ProfileSchedulePostCard key={userSchedulePost._id} userSchedulePost={userSchedulePost} user={user}/>
                              );
                          })
                        }
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