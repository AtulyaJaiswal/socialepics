// import { Button } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react';
import "./CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { createsPost, createSchedulePost } from '../../actions/postAction';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import { CREATE_SCHEDULE_POST_RESET } from '../../constants/postConstants';
import { CREATE_POST_RESET } from '../../constants/postConstants';


const CreatePost = () => {

    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.user);
    const { success } = useSelector((state) => state.createPost);
    const { success: scheduleSuccess } = useSelector((state) => state.schedulePost);

    const[topic,setTopic] = useState("");
    const[text, setText] = useState("");
    const[showCalendar, setShowCalendar] = useState(false);
    // console.log(showCalendar);

    const settingCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    // console.log(topic);
    // console.log(text);

    const today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const date2 = today.getFullYear()+1 + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes()+5;
    const [dateWithInitialValue, setDateWithInitialValue] = useState(dayjs(date+"T"+time));

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

    const schedulePost = (e) => {
        e.preventDefault();

        if(isAuthenticated===false){
            toast.error("Login to access this.");
        }
    
        if(topic.trim()==="" || text.trim()===""){
            toast.error("Fill the fields first");
        }
        else{
            const scheduleTime = dateWithInitialValue.$y+" "+dateWithInitialValue.$M+1+" "+
                                 dateWithInitialValue.$D+" "+dateWithInitialValue.$H+" "+
                                 dateWithInitialValue.$m;

            const myForm = new FormData();
            myForm.set("topic", topic.trim());
            myForm.set("text", text.trim());
            myForm.set("scheduleTime", scheduleTime);
            dispatch(createSchedulePost(myForm));
        }
    }


    useEffect(() => {
        if (window.innerWidth<=600 && success) {
            setTopic("");
            setText("");
            toast.success("Posted");
            dispatch({ type: CREATE_POST_RESET });
        }
        if(window.innerWidth<=600 && scheduleSuccess){
            setTopic("");
            setText("");
            toast.success("Post Scheduled");
            dispatch({ type: CREATE_SCHEDULE_POST_RESET });
        }
    }, [ success, dispatch, scheduleSuccess ]);
    

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
                <div className='post_with_calendar'
                    style={showCalendar===true? {display: "flex"} : {display: "none"}}
                >
                    <div className='calendar'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                            <DateTimePicker
                                disableFuture={false}
                                hideTabs
                                openTo='day'
                                value={dateWithInitialValue}
                                onChange={(newValue) => {
                                setDateWithInitialValue(newValue);
                                }}
                                minDate={dayjs(date)}
                                maxDate={dayjs(date2)}
                                InputProps={{ sx: { '& .MuiSvgIcon-root': { color: "orange" }, }, }}
                                renderInput={(params) => (
                                <TextField {...params}
                                //  helperText="Pick your scheduled time & date" 
                                 sx={{
                                    '.MuiInputBase-input': {
                                        borderColor: "orange",
                                        background: "black",
                                        color: "white"
                                    },
                                 }}
                                />
                                )}
                            />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div className='post_with_calendar_button'>
                        <button onClick={schedulePost}>Schedule</button>
                        <button onClick={settingCalendar}>Cancel Schedule</button>
                    </div>
                </div>
                <div className='post_without_calendar'
                    style={showCalendar===true ? {display: "none"} : {display: "flex"}}
                >
                    <div className='post_without_calendar_button'>
                        <button onClick={post}>Post</button>
                        <button onClick={settingCalendar}>Schedule Post</button>
                    </div>
                </div>
        </div>
    </Fragment>
  )
}

export default CreatePost