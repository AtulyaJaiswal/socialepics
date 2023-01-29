import React, { Fragment, useState, useEffect } from 'react';
import "./ProfilePostCard.css";
import Person4Icon from '@mui/icons-material/Person4';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/postAction';
import {  useDispatch } from "react-redux";
import { likeDislike } from '../../actions/postAction';

const ProfilePostCard = ({userPost,user}) => {

    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(userPost.hearts.length);

    const handleLike = async () => {
        setLiked(!liked);
        setLikeCount(liked?likeCount-1:likeCount+1);
        dispatch(likeDislike(userPost._id));
    };

    const deletePosts = () => {
        dispatch(deletePost(userPost._id));
    }

    useEffect(() => {
        userPost.hearts.forEach((item) => {
            if (item === user._id) {
                setLiked(true);
            }
        });
    }, [ userPost.hearts]);

  return (
    <Fragment>
        <div className='card'>
            <div className='profile_icon'>
                <Person4Icon 
                    style={{color: userPost.avatarColor}}
                />
            </div>
            <div className='post'>
                <div className='post_name'>
                    <h4 style={{color:"orange"}}>{userPost.userName}</h4>
                    <DeleteOutlineIcon onClick={deletePosts}/>
                </div>
                <Link className='card_head' to={`/comment/${userPost._id}`}>
                    <p>{userPost.post}</p>
                </Link>
                <div className='post_footer'>
                <Link className='card_head' to={`/comment/${userPost._id}`}>
                    <div className='post_footer_button'>
                        <ForumOutlinedIcon/>
                        <span className='number'>{userPost.comments.length}</span>
                    </div>
                </Link>
                    {/* <div className='post_footer_button'>
                        <HeartBrokenIcon/>
                        <span className='number'>0</span>
                    </div> */}
                    <div className='post_footer_button'>
                        <FavoriteIcon 
                            style={liked?{color:"red"}:{color:"white"}}
                            onClick={() => handleLike()}/>
                        <span className='number'>{likeCount}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='break'>
            
        </div>
    </Fragment>
  )
}

export default ProfilePostCard