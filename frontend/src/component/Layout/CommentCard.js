import React, { Fragment } from 'react';
import "./CommentCard.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteComment } from '../../actions/postAction';
import { useDispatch } from "react-redux";

const CommentCard = ({com, user, post}) => {

  // console.log(post);
  // console.log(user);
  // console.log(com);

  const dispatch = useDispatch();

  const deletePosts = () => {
    dispatch(deleteComment(post._id,com._id));
  }

  return (
    <Fragment>
        {/* <div className='division'></div> */}
        <div className='comment_card'>
            <div className='comment_card_inner'>
              {user && (user._id===com.comment_user_id || post.user_id===user._id ) ? (
                <div className='comment_post_name'>
                  <h4 style={{color:"orange"}}>{com.comment_userName}</h4>
                  <DeleteOutlineIcon onClick={deletePosts}/>
                </div>
              ) : (
                <div className='comment_post_name'>
                    <h4 style={{color:"orange"}}>{com.comment_userName}</h4>
                </div>
              )}
                <p>{com.comment}</p>
            </div>
        </div>
        <div className='division'></div>
    </Fragment>
  )
}

export default CommentCard;