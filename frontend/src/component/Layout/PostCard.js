import React, { Fragment, useEffect, useState } from 'react';
import "./PostCard.css";
import Person4Icon from '@mui/icons-material/Person4';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { Link } from 'react-router-dom';
import { likeDislike, getPosts } from '../../actions/postAction';
import { useSelector, useDispatch } from "react-redux";

const PostCard = ({post,user,isAuthenticated}) => {

    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.hearts.length);

    const handleLike = async () => {
        setLiked(!liked);
        setLikeCount(liked?likeCount-1:likeCount+1);
        dispatch(likeDislike(post._id));
    };

    useEffect(() => {
        if(isAuthenticated===true){
            post.hearts.forEach((item) => {
                if (item === user._id) {
                    setLiked(true);
                }
            });
        }
    }, [isAuthenticated, post.hearts]);

  return (
    <Fragment>
        
        <div className='card'>
            <div className='profile_icon'><Person4Icon 
            style={{color: post.avatarColor}}
            /></div>
            <div className='post'>
            <Link className='card_head' to={`/comment/${post._id}`}>
                <h4 
                style={{color:"orange"}}
                >{post.userName}</h4>
                <p>{post.post}</p>
            </Link>
                <div className='post_footer'>
                <Link className='card_head' to={`/comment/${post._id}`}>
                    <div className='post_footer_button'>
                        <ForumOutlinedIcon/>
                        <span className='number'>{post.comments.length}</span>
                    </div>
                </Link>
                    {/* <div className='post_footer_button'>
                        <HeartBrokenIcon onClick={()=>setLikesUser(!likesUser)}/>
                        <span className='number'>{post.condolences.length}</span>
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

export default PostCard