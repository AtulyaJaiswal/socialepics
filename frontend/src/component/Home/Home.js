import React, { Fragment, useEffect } from 'react';
import "./Home.css";
import PostCard from '../Layout/PostCard';
import CreatePost from '../Layout/CreatePost';
import { getPosts, clearErrors } from '../../actions/postAction';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
// import { CREATE_POST_RESET, CREATE_SCHEDULE_POST_RESET } from '../../constants/postConstants';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import TrendHeader from '../Trend/TrendHeader';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, posts } = useSelector((state) => state.posts);
  // const { success } = useSelector((state) => state.createPost);
  // const { success: scheduleSuccess } = useSelector((state) => state.schedulePost);
  const { loading:userLoading, isAuthenticated, user } = useSelector((state) => state.user);
  const { loading: trendLoading, trends} = useSelector((state) => state.trends);
  // console.log(trends);
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
    // if (success) {
    //   toast.success("Posted");
    //   dispatch({ type: CREATE_POST_RESET });
    // }
    // if(scheduleSuccess){
    //   toast.success("Post Scheduled");
    //   dispatch({ type: CREATE_SCHEDULE_POST_RESET });
    // }
    dispatch(getPosts());
  },[dispatch, error]);
  
  return (
    <Fragment>
        {loading===true || userLoading===true || trendLoading===true ? (
          <Loader/>
        ) : (
          <Fragment>
            <div className='home'>
              <div className='home_left'>
                  <div className='home_heading'>
                    <h4>HOT TOPICS</h4>
                    <div className='trend_design'>
                      {trends &&
                          trends.map((trend, id) => {
                            return(
                              <TrendHeader key={id} trend={trend}/>
                            )
                          })
                      }
                    </div>
                  </div>
                  <div className='break'></div>
                  <div>
                    {posts &&
                      posts.map((post) => {
                        return(
                          <PostCard key={post._id} post={post} user={user} isAuthenticated={isAuthenticated} />
                        );
                      })
                    }
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