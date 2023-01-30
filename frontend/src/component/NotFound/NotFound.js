import React, { Fragment } from 'react';
import "./NotFound.css";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Fragment>
          <div className='error_page'>
               <h1>404 Error, Page Not Found</h1>
               <Link to="/">Go Back to Home</Link>
          </div>
    </Fragment>
  )
}

export default NotFound