import React, { Fragment } from 'react';
import "./Blog.css";
import { Link } from 'react-router-dom';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import "./Blog.css";

const Blog = ({updatePosts,user,isAuthenticated}) => {
  return (
    <Fragment>
        <div className='update_card'>
            <div className='updateProfile_icon'>
                <SystemSecurityUpdateGoodIcon 
                    style={{color: 'green'}}
                />
            </div>
            <div className='updatePosts'>
                <Link className='updateCard_head'>
                    <h4 
                    style={{color:"orange"}}
                    >{updatePosts.headline}</h4>
                    <p>{updatePosts.post}</p>
                </Link>
                {/* <div className='updatePosts_footer'>
                <Link className='card_head' to={`/comment/${updatePosts._id}`}>
                    <div className='updatePosts_footer_button'>
                        <ForumOutlinedIcon/>
                        <span className='number'>{updatePosts.comments.length}</span>
                    </div>
                </Link>
                    <div className='updatePosts_footer_button'>
                        <FavoriteIcon 
                            style={liked?{color:"red"}:{color:"white"}}
                            onClick={() => handleLike()}/>
                        <span className='number'>{likeCount}</span>
                    </div>
                </div> */}
            </div>
        </div>
        <div className='break'>
            
        </div>
        
    </Fragment>
  )
}

export default Blog