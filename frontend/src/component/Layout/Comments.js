import React, { Fragment, useEffect, useState } from 'react';
import { openSpecificPost, clearErrors, addComment } from '../../actions/postAction';
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import { useParams } from 'react-router-dom';
import { COMMENT_DELETE_RESET, COMMENT_RESET } from '../../constants/postConstants';
import CommentCard from "./CommentCard.js";

const Comments = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, post } = useSelector((state) => state.openSpecificPost);
    const { success} = useSelector((state) => state.comment);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { error:deletedError, isDeleted } = useSelector((state) => state.commentDelete);
    // console.log(post);

    const[comment,setComment] = useState("");

    const commentSubmit = (e) => {
        e.preventDefault();

        if(isAuthenticated===false){
            toast.error("Login to access this.");
        }
        
        if(comment.trim()===""){
            toast.error("Fill the field first");
            setComment("");
        }
        else{
            dispatch(addComment(comment,id));  
        }
             
    };

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(openSpecificPost(id));

        if (success) {
            toast.success("Commented");
            setComment("")
            dispatch({ type: COMMENT_RESET });
        }

        if(deletedError){
            toast.error(deletedError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            toast.success("Comment Deleted");
            dispatch({ type: COMMENT_DELETE_RESET });
        }
    }, [dispatch, id, success, error, isDeleted, deletedError]);

  return (
    <Fragment>
        {loading ? (
          <Loader/>
        ) : (
            <Fragment>
                <div className='comment'>
                    <div>
                    <div className='comment_heading'>
                        <h4>{post.userName}</h4>
                        <p>{post.post}</p>
                    </div>
                    <div className='comment-enter'>
                        <textarea
                            // maxLength={40}
                            className='comment-input'
                            placeholder='Enter your comment*'
                            type="text"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button 
                        className='button_comment'
                        onClick={commentSubmit}
                        >Comment</button>
                    </div>
                    </div>
                    
                    <div className='comment_area'>
                        {
                            (Array.isArray(post.comments) && post.comments.length) ? (
                                post.comments && 
                                post.comments.map((com) => {
                                    return(
                                        <CommentCard key={com._id} com={com} user={user} post={post} />
                                    );
                                })
                            ) : (
                                <div className='no_comment'>
                                <h3>No comments yet.</h3>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Comments;