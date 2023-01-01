import React, {Fragment} from 'react';
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Fragment>
          <div className="sidebar">
               <div className='sidebar_list'>
                    <div className='sidebar_list_heading'>
                         <Link to="/admin/dashboard">
                              <h3>
                              Dashboard
                              </h3>
                         </Link>
                    </div>
                    <div className='break'></div>
                    <div className='sidebar_list_heading'>
                         <Link to="/admin/userList">
                              <h3>
                              Users List
                              </h3>
                         </Link>
                    </div>
                    <div className='break'></div>
                    <div className='sidebar_list_heading'>
                         <Link to="/admin/searchUser">
                              <h3>
                              Search User
                              </h3>
                         </Link>
                    </div>
                    <div className='break'></div>
                    <div className='sidebar_list_heading'>
                         <Link to="/admin/postList">
                              <h3>
                              Post Lists
                              </h3>
                         </Link>
                    </div>
                    <div className='break'></div>
                    <div className='sidebar_list_heading'>
                         <Link to="/admin/searchPost">
                              <h3>
                              Search Post
                              </h3>
                         </Link>
                    </div>
               </div>
          </div>
    </Fragment>
  )
}

export default Sidebar