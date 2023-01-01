import React , {Fragment} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Dashboard.css";
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Fragment>
          <div className='dashboard'>
               <Sidebar/>
               <div className='dashboard_in'>
                    <div className='dashboard_heading'>
                         <h1>Admin Dashboard</h1>
                    </div>
                    
               </div>
          </div>
     </Fragment>
  )
}

export default Dashboard;