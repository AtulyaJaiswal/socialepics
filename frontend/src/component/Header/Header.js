import {React,Fragment} from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";
import Logo from "../../Images/Logo2.png";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Header = () => {
  
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
        {loading ? (
          <Loader/>
        ) : (
          <Fragment>
              <div className='navbar'>
                  <div className='navbar_left'>
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <AccountCircleOutlinedIcon style={{fontSize:"2rem"}}/>
                    </Link>
                    ) : (
                      <Link to="/login">
                        <AccountCircleOutlinedIcon style={{fontSize:"2rem"}}/>
                      </Link>
                    )} 
                  </div>  
                  <div className='navbar_right'>
                    <Link to="/">
                      <img
                      className='logo'
                      src={Logo}
                      alt="Logo"
                      />
                    </Link>
                  </div>
                  {/* <Link to="/updates">
                    <UpgradeIcon style={{fontSize:"2rem"}}/>
                  </Link> */}
              </div>
          </Fragment>
    )}
    </Fragment>
  )
}

export default Header;