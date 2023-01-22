// import { Button } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react';
import "./CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { createsPost } from '../../actions/postAction';
import {toast} from 'react-toastify';

const CreatePost = () => {

    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.user);
    const { success } = useSelector((state) => state.createPost);

    const[topic,setTopic] = useState("");
    const[text, setText] = useState("");

    // console.log(topic);
    // console.log(text);

    const post = (e) => {
        e.preventDefault();

        if(isAuthenticated===false){
            toast.error("Login to access this.");
        }
    
        if(topic.trim()==="" || text.trim()===""){
            toast.error("Fill the fields first");
        }
        else{
            const myForm = new FormData();
            myForm.set("topic", topic.trim());
            myForm.set("text", text.trim());
            dispatch(createsPost(myForm));
        }
    }

    useEffect(() => {
        if (success) {
            // toast.success("Posted");
            setTopic("");
            setText("");
            // dispatch({ type: CREATE_POST_RESET });
        }
    }, [ success ]);
    

  return (
    <Fragment>
        <div className='create-post'>
            <div className='post_heading'>
                <h3>Create Post</h3>
            </div>
            <div className='post_input'> 
                <h6>Topic</h6>
                <textarea
                    maxLength={40}
                    className='topic-input'
                    placeholder='Enter the topic*'
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <h6>Text</h6>
                <textarea
                    maxLength={1000}
                    className='text-input'
                    placeholder='Enter your feelings*'
                    type="text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className='post_button'>
                <button onClick={post}>Post</button>
            </div>
        </div>
    </Fragment>
  )
}

export default CreatePost