import React, { Fragment, useEffect, useState } from 'react'
import Blog from './Blog';
import Loader from "../Loader/Loader";
import "./Update.css";
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify';
import { clearErrors, createsUpdatePost, getUpdatePosts } from '../../actions/adminAction';
import { CREATE_UPDATE_POST_RESET } from '../../constants/adminConstants';

const Update = () => {

     const dispatch = useDispatch();

     const { loading, isAuthenticated, user } = useSelector((state) => state.user);
     const { loading: updatePostLoading, error, updatePosts } = useSelector((state) => state.updatePosts);
     const { success } = useSelector((state) => state.createUpdatePosts);
     console.log(updatePosts);

     const[update,setUpdate]=useState("");
     const[headline,setHeadline]=useState("");

     const updatePost = (e) => {
          e.preventDefault();
  
          if(isAuthenticated===false){
              toast.error("Login to access this.");
          }
      
          if(headline.trim()==="" || update.trim()===""){
              toast.error("Fill the fields first");
          }
          else{
              const myForm = new FormData();
              myForm.set("headline", headline.trim());
              myForm.set("update", update.trim());
              dispatch(createsUpdatePost(myForm));
          }
      }

     useEffect(() => {
          if(error){
               toast.error(error);
               dispatch(clearErrors());
           }
          if (success) {
               toast.success("Posted");
               setHeadline("");
               setUpdate("");
               dispatch({ type: CREATE_UPDATE_POST_RESET });
          }
          dispatch(getUpdatePosts());
     }, [ success, dispatch, error ]);


     return (
          <Fragment>
               {loading===true || updatePostLoading===true ? (
               <Loader/>
               ) : (
               <Fragment>
                    <div className='update'>
                         <div className='update_heading'>
                              <h4>Updates</h4>
                         </div>
                         {user!=null && user.role==="admin" ? (
                              <div className='update_text_field'>
                                   <textarea
                                        className='update_input'
                                        placeholder='Enter the headline*'
                                        type="text"
                                        required
                                        value={headline}
                                        onChange={(e) => setHeadline(e.target.value)}
                                   />
                                   <textarea
                                        className='update_input'
                                        placeholder='Enter the update*'
                                        type="text"
                                        required
                                        value={update}
                                        onChange={(e) => setUpdate(e.target.value)}
                                   />
                                   <div className='update_button'>
                                        <button onClick={updatePost}>
                                             Update
                                        </button>
                                   </div>
                              </div>
                         ) :(
                              <div></div>
                         )}
                         <div>
                         {
                          (Array.isArray(updatePosts) && updatePosts.length) ? (
                            updatePosts &&
                              updatePosts.map((updatePosts) => {
                                return(
                                  <Blog key={updatePosts._id} updatePosts={updatePosts} user={user}/>
                                );
                            })
                          ) : (
                            <div className='no_posts'>
                              <h3>No Posts yet.</h3>
                            </div>
                          )
                        }
                         </div>

                    </div>
               </Fragment>
               )}
          </Fragment>
     )
}
export default Update