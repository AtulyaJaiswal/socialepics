import React, { Fragment } from 'react';
import "./CommentCard.css";

const CommentCard = ({com}) => {
  return (
    <Fragment>
        {/* <div className='division'></div> */}
        <div className='comment_card'>
            <div className='comment_card_inner'>
                <h4>{com.comment_userName}</h4>
                <p>{com.comment}</p>
            </div>
        </div>
        <div className='division'></div>
    </Fragment>
  )
}

export default CommentCard;