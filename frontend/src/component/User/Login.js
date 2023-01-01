import React, { Fragment, useEffect } from 'react';
import "./RegisterLogin.css";
import { auth,provider } from '../../firebase';
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import { login } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if(isAuthenticated){
            navigate("/profile");
        }
    },[isAuthenticated, navigate]);

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
            // console.log(result);
            dispatch(login(result.user.email));
            if(!isAuthenticated){
                navigate("/register", {
                    state:{
                        displayName: result.user.displayName,
                        userEmail: result.user.email,
                    }
                });
            }
        })
        .catch(error => {
            toast.error(error.message);
        })
    };

   

    return (
        <Fragment>
        {loading ? (
          <Loader/>
        ) : (
        <Fragment>
            <div className='login'>
                <div className='login_heading'>
                    <h2>
                        <span style={{color:"orange"}}>Welcome</span>
                        <span style={{color:"orange"}}> to</span> 
                        <span style={{color:"orange", textDecoration:"underline"}}> Social-Epics</span>
                    </h2>
                </div>
                <div className='login_container'>
                    <button onClick={signIn}>
                        <img
                        src="https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png"
                        alt='Google'
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
    );
}

export default Login;