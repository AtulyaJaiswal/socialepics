import React, { Fragment, useEffect } from 'react';
import "../Home/Home.css";
import PostCard from '../Layout/PostCard';
import CreatePost from '../Layout/CreatePost';
import { clearErrors } from '../../actions/postAction';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import { CREATE_POST_RESET } from '../../constants/postConstants';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import TrendHeader from './TrendHeader';
const Trend = () => {

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { loading, error, trendPosts } = useSelector((state) => state.trendPosts);
     const { success } = useSelector((state) => state.createPost);
     const { loading:userLoading, isAuthenticated, user } = useSelector((state) => state.user);
     const { loading: trendLoading, trends} = useSelector((state) => state.trends);
     // console.log(trends);
     // console.log(user);
   
     const open = () => {
       if(isAuthenticated===false){
         toast.error("Login first");
       }
   
       if(isAuthenticated){
         navigate("/createPostMobile");
       }
     }
     
     useEffect(() => {
       if(error){
         toast.error(error);
         dispatch(clearErrors());
       }
       if (success) {
         toast.success("Posted");
         dispatch({ type: CREATE_POST_RESET });
       }
     },[dispatch, success, error]);
     
     return (
       <Fragment>
           {loading===true || userLoading===true || trendLoading===true ? (
             <Loader/>
           ) : (
             <Fragment>
               <div className='home'>
                 <div className='home_left'>
                     <div className='home_heading'>
                       <h4>HOT TOPICS</h4>
                       {/* <h4>Do Not Try Something Here</h4> */}
                       {/* {trendLoading===true ? (
                         <Loader/>
                       ) : (
                         trends &&
                           trends.map((trend, id) => {
                             return(
                               <h4 key={id}>{trend}</h4>
                             )
                           })
                       )} */}
                       <div className='trend_design'>
                         {trends &&
                              trends.map((trend, id) => {
                              return(
                                   <TrendHeader key={id} trend={trend}/>
                              )
                              })
                         }
                       </div>
                     </div>
                     <div className='break'></div>
                     <div>
                       {trendPosts &&
                         trendPosts.map((post) => {
                           return(
                             <PostCard key={post._id} post={post} user={user} isAuthenticated={isAuthenticated} />
                           );
                         })}
                     </div>
                 </div>
                 <div className='home_right'>
                     <CreatePost/>
                 </div>
               </div>
   
               {/* FLOATING BUTTON */}
               <div className='floating_button'>
                   <button onClick={open}>
                       <AddIcon/>
                   </button>
               </div>
             </Fragment>
           )}
       </Fragment>
     )
   }

export default Trend