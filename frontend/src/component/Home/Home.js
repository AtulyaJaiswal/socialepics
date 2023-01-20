import React, { Fragment, useEffect } from 'react';
import "./Home.css";
import PostCard from '../Layout/PostCard';
import CreatePost from '../Layout/CreatePost';
import { getPosts, clearErrors } from '../../actions/postAction';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import { CREATE_POST_RESET } from '../../constants/postConstants';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, posts } = useSelector((state) => state.posts);
  const { success } = useSelector((state) => state.createPost);
  const { loading:userLoading, isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(user);

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
    if (success) {
      toast.success("Posted");
      dispatch({ type: CREATE_POST_RESET });
    }
    dispatch(getPosts());
  },[dispatch, success, error]);
  
  return (
    <Fragment>
        {loading===true || userLoading===true ? (
          <Loader/>
        ) : (
          <Fragment>
            <div className='home'>
              <div className='home_left'>
                  <div className='home_heading'>
                    <h4>Try Something Here</h4>
                  </div>
                  <div>
                    {posts &&
                      posts.map((post) => {
                        return(
                          <PostCard key={post._id} post={post} user={user} isAuthenticated={isAuthenticated} />
                        );
                      })}
                  </div>
              </div>
              <div className='home_right'>
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

export default Home;