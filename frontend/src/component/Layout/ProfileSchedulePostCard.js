import React, { Fragment, useState, useEffect } from 'react';
import "./ProfileSchedulePostCard.css";
import Person4Icon from '@mui/icons-material/Person4';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { deleteScheduledPost } from '../../actions/postAction';
import {  useDispatch } from "react-redux";

const ProfileSchedulePostCard = ({userSchedulePost,user}) => {

    const dispatch = useDispatch();

    const arr = userSchedulePost.expectedPostTime.split(" ");
    const scheduledDate = arr[2]+"-"+arr[1]+"-"+arr[0];
    const scheduledTime = arr[3]+":"+arr[4];

    const deletePosts = () => {
        dispatch(deleteScheduledPost(userSchedulePost._id));
    }

  return (
    <Fragment>
        <div className='scheduledCard'>
            <div className='profile_icon'>
                <Person4Icon 
                    style={{color: "gray"}}
                />
            </div>
            <div className='scheduledPost'>
                <div className='scheduled_post_name'>
                    <div className='scheduled_post_name_inner'>
                        <h4 style={{color:"orange"}}>{userSchedulePost.userName}</h4>
                        <h5>Scheduled ({scheduledDate} at {scheduledTime})</h5>
                    </div>
                    <DeleteOutlineIcon onClick={deletePosts}/>
                </div>
                <Link className='scheduled_card_head'>
                    <p>{userSchedulePost.post}</p>
                </Link>
            </div>
        </div>
        <div className='break'>
            
        </div>
    </Fragment>
  )
}

export default ProfileSchedulePostCard;