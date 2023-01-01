import React, {Fragment, useEffect, useState} from 'react'
import SideBar from "./Sidebar";
import PostDetails from "./PostDetails.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, clearErrors } from '../../actions/postAction';
import Loader from "../Loader/Loader";
import {toast} from "react-toastify";



const PostList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[dis,setDis]=useState(-1);

  const toggleElement = (index) => {
    if(index===dis){
      setDis(-1);
    }
    else setDis(index);
  }

  const { loading, error, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getPosts());
  },[dispatch, error]);

  console.log(posts);

  return (
    <Fragment>
        {loading ? (
          <Loader/>
        ) : (
          <div className="dashboard">
            <SideBar />
            <div className="postListContainer">
              <div className='postListHeading'>
                <h1 className="userListHeading">
                  ALL POSTS
                </h1>
              </div>
              <div>
                {posts && posts.map((post, postIndex) => {
                  return(
                    <div key={post._id}>
                      <button onClick={() => toggleElement(postIndex)}>Details</button>
                      <div style={{display: dis===postIndex ? "grid" : "none"}}>
                        {dis===postIndex && <PostDetails id={post._id} op={true} />}
                      </div>
                      <div><p>{post.user_id}</p></div>
                      <div><p>{post.topic}</p></div>
                      <div><p>{post.post}</p></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
     </Fragment>
  )
}


export default PostList;